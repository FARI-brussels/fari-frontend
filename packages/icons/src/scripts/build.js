import { promises as fs } from 'fs';
import path from 'path';
import { generateIconTypes } from './generateIconTypes.js';
import { fileURLToPath } from 'url';
import { toCamelCase, toPascalCase } from '@fari-brussels/shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
  root: '../../dist',
  src: {
    svg: path.resolve(__dirname, '../../src/svg'),
  },
  dist: {
    svg: path.resolve(__dirname, '../../dist/svg'),
    js: path.resolve(__dirname, '../../dist/js'),
    vue: path.resolve(__dirname, '../../dist/vue'),
    types: {
      root: path.resolve(__dirname, '../../dist/types'),
      js: path.resolve(__dirname, '../../dist/types/js'),
      vue: path.resolve(__dirname, '../../dist/types/vue'),
      vueTs: path.resolve(__dirname, '../../dist/types/vue.ts'),
    },
  },
};

async function ensureDirectories() {
  const dirs = [
    paths.dist.svg,
    paths.dist.js,
    paths.dist.vue,
    paths.dist.types.root,
    paths.dist.types.js,
    paths.dist.types.vue,
  ];
  await Promise.all(dirs.map(dir => fs.mkdir(dir, { recursive: true })));
}

async function ensureVueTypeFile() {
  try {
    await fs.access(paths.dist.types.vueTs);
  } catch {
    await fs.writeFile(
      paths.dist.types.vueTs,
      `import type { DefineComponent } from "vue";\nexport type FariIconVue = DefineComponent<{ size?: string; color?: string }>;`
    );
  }
}

async function clearDirectory(path) {
  console.info('Deleting old dist files')
  await fs.rm(path, { recursive: true, force: true });
  console.info('Deleted old dist files, building new')
}

async function buildIcons() {
  console.info('🚀 Starting build process...');

  await ensureDirectories();
  await ensureVueTypeFile();
  await clearDirectory(paths.root)


  const files = await fs.readdir(paths.src.svg);
  if (!files.length) {
    console.log('⚠️ No SVG files found in', paths.src.svg);
    return;
  }

  const svgExports = [];
  const jsExports = [];
  const jsTypeExports = [];
  const vueExports = [];
  const vueTypeExports = [];

  for (const file of files) {
    if (!file.endsWith('.svg')) continue;
    console.info(`Processing: ${file}`);

    const name = path.basename(file, '.svg');
    const camelCaseName = toCamelCase(name);
    const pascalCaseName = toPascalCase(name);
    const svgContent = (await fs.readFile(path.join(paths.src.svg, file), 'utf8')).replace(/\n/g, '');

    // SVG Export
    await fs.writeFile(path.join(paths.dist.svg, file), svgContent); // Copy raw SVG
    svgExports.push(`export const ${camelCaseName} = \`${svgContent}\`;`);

    // JS Export
    const jsContent = `export const ${pascalCaseName} = \`${svgContent}\`;`;

    await fs.writeFile(path.join(paths.dist.js, `${pascalCaseName}.js`), jsContent);

    //JS Export Type Declaration
    await fs.writeFile(
      path.join(paths.dist.types.js, `${pascalCaseName}.d.ts`),
      `export declare const ${pascalCaseName}: string;`
    );
    jsTypeExports.push(`export type { default as ${pascalCaseName} } from './${pascalCaseName}.d.ts';`);
    jsExports.push(`export { ${pascalCaseName} } from './${pascalCaseName}.js';`);

    // Vue Export
    const vueComponent = `
    <script setup lang="ts">
    const { size = '24', color = 'currentColor' } = defineProps<{ size?: string; color?: string }>();
    </script>

    <template>
      ${svgContent.replace('<svg', '<svg v-bind="$attrs"')} 
    </template>`;
    await fs.writeFile(path.join(paths.dist.vue, `${pascalCaseName}Icon.vue`), vueComponent);
    vueExports.push(`export { default as ${pascalCaseName}Icon } from './${pascalCaseName}Icon.vue';`);
    vueTypeExports.push(`export type { default as ${pascalCaseName}Icon } from './${pascalCaseName}Icon.d.ts';`);

    // Vue Type Declaration
    await fs.writeFile(
      path.join(paths.dist.types.vue, `${pascalCaseName}Icon.d.ts`),
      `import { FariIconVue } from "../vue.ts";\ndeclare const ${pascalCaseName}Icon: FariIconVue;\nexport default ${pascalCaseName}Icon;`
    );
  }

  if (typeof generateIconTypes !== 'function') {
    throw new Error('generateIconTypes is not a function. Ensure ./generateIconTypes.js exports it correctly.');
  }

  const IconType = await generateIconTypes();

  await fs.writeFile(path.join(paths.dist.svg, 'index.js'), svgExports.join('\n'));
  await fs.writeFile(
    path.join(paths.dist.svg, 'index.d.ts'),
    svgExports.map(exp => exp.replace('export const', 'export declare const') + ': string;').join('\n')
  );

  await fs.writeFile(path.join(paths.dist.js, 'index.js'), jsExports.join('\n'));

  await fs.writeFile(path.join(paths.dist.vue, 'index.js'), vueExports.join('\n'));

  console.log(jsTypeExports)
  await fs.writeFile(path.join(paths.dist.types.js, 'index.d.ts'), jsTypeExports.join('\n'));
  await fs.writeFile(path.join(paths.dist.types.vue, 'index.d.ts'), vueTypeExports.join('\n'));

  const typesIndexContent = 
    `
    import type { FariIconVue } from './vue.ts';
    export * from './js';
    export * from './vue';
    export type { IconName } from './Icon';
    export type { FariIconVue };
    `;

  await fs.writeFile(path.join(paths.dist.types.root, 'Icon.ts'), IconType);
  await fs.writeFile(path.join(paths.dist.types.root, 'index.d.ts'), typesIndexContent);

  console.info('✅ Build complete!');
}

buildIcons().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});