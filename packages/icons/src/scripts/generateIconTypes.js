import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../svg');
const iconFilePath = path.join(__dirname, '../types/Icon.ts');

export async function generateIconTypes() {
  try {
    const iconFiles = await fs.readdir(iconsDir);

    const iconNames = iconFiles
      .filter((file) => file.endsWith('.svg'))
      .map((file) => path.basename(file, '.svg'));

    const typeDefinition = `
      export type IconName = ${iconNames
        .map((name) => `'${name}'`)
        .join(' | ')};
    `.trim();

    let existingContent = '';
    try {
      existingContent = await fs.readFile(iconFilePath, 'utf8');
    } catch (e) {
      // File might not exist yet, start fresh
    }

    const typePattern = /export\s+type\s+IconName\s+=\s+[^;]+;/;

    if (typePattern.test(existingContent)) {
      existingContent = existingContent.replace(typePattern, typeDefinition);
    } else {
      existingContent = `${existingContent.trim()}\n\n${typeDefinition}`;
    }

    await fs.writeFile(iconFilePath, existingContent);

    console.info(`Icon types updated successfully in ${iconFilePath}`);
    return typeDefinition;
  } catch (error) {
    console.error('Error generating icon types:', error);
    process.exit(1);
  }
}

// generateIconTypes();