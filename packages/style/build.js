const fs = require('fs');
const path = require('path');

// Configuration
const outputDir = 'dist/sass';
const outputFile = path.join(outputDir, 'style.scss');
const baseDir = 'src';

// List of files to include (in dependency order)
const files = [
  'variables/borders.scss',
  'variables/colors.scss',
  'variables/spacings.scss',
  'variables/typography.scss',
  'mixins/class-generator.scss',
  'classes/borders.scss',
  'classes/colors.scss',
  'classes/spacings.scss',
  'classes/typography.scss',
  'base.scss'
];

// Helper to read file content and process @use statements
function processFile(filePath, processedFiles = new Set()) {
  if (processedFiles.has(filePath)) return ''; // Avoid circular dependencies
  processedFiles.add(filePath);

  const fullPath = path.join(baseDir, filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  let processedContent = '';

  const lines = content.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('@use')) {
      const match = line.match(/@use\s+['"]([^'"]+)['"](?:\s+as\s+([a-zA-Z0-9_-]+))?/);
      if (match) {
        let usedFile = match[1];
        // Only append .scss if it’s not already present
        if (!usedFile.endsWith('.scss')) {
          usedFile += '.scss';
        }
        const fullUsedPath = path.join(path.dirname(filePath), usedFile);
        processedContent += processFile(fullUsedPath, processedFiles);
      }
    } else {
      // Remove namespace prefixes (e.g., c.$, t.$) from variable references
      processedContent += line.replace(/([a-zA-Z0-9_-]+)\.\$/g, '$') + '\n';
    }
  }

  return processedContent;
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Combine all files
let combinedContent = '/* FARI Style Library - Combined SCSS */\n\n';

const processedFiles = new Set();
files.forEach(file => {
  const content = processFile(file, processedFiles);
  combinedContent += `/* Content from src/${file} */\n${content}\n`;
});

// Write the combined content
fs.writeFileSync(outputFile, combinedContent, 'utf8');

console.log(`Combined SCSS written to ${outputFile}`);