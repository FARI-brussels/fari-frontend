import * as fs from 'fs';
import path from 'path';

const outputDir = 'dist/sass';
const outputFile = path.join(outputDir, 'style.scss');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const styleScssPath = 'node_modules/@fari-brussels/style/dist/sass/style.scss';
const styleScssContent = fs.readFileSync(styleScssPath, 'utf8');

const componentsScssPath = 'src/index.scss';
const componentsScssContent = fs.readFileSync(componentsScssPath, 'utf8');

let combinedContent = '/* FARI Components - Combined SCSS (includes @fari-brussels/style) */\n\n';
combinedContent += `/* From @fari-brussels/style */\n${styleScssContent}\n\n`;
combinedContent += `/* From @fari-brussels/components */\n${componentsScssContent.replace(/@use 'style';/, '')}\n`;

fs.writeFileSync(outputFile, combinedContent, 'utf8');
console.log(`Combined SCSS written to ${outputFile}`);
