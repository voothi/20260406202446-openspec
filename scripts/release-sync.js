import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RELEASE_DIR = path.join(ROOT, 'dist-release');

// List of files that form the distribution (based on package.json 'files')
const FILES_TO_MIRROR = [
  'dist',
  'bin',
  'schemas',
  'package.json',
  'README.md',
  'LICENSE'
];

console.log('🔄 Mirroring distribution artifacts to ./dist-release');

try {
  // 1. Reset the release directory
  if (fs.existsSync(RELEASE_DIR)) {
    fs.rmSync(RELEASE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(RELEASE_DIR, { recursive: true });

  // 2. Mirror files and directories
  FILES_TO_MIRROR.forEach(file => {
    const src = path.join(ROOT, file);
    const dest = path.join(RELEASE_DIR, file);

    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { 
        recursive: true,
        // Ensure we don't accidentally copy sourcemaps or tests from dist
        filter: (srcPath) => {
          const base = path.basename(srcPath);
          return !base.endsWith('.map') && !base.endsWith('.test.js');
        }
      });
      console.log(` ✅ ${file}`);
    } else {
      console.warn(` ⚠️  Warning: ${file} not found at source.`);
    }
  });

  console.log('\n✨ Mirroring complete. Zero-dependency runtime ready in ./dist-release');
} catch (error) {
  console.error(' ❌ Mirroring failed:', error.message);
  process.exit(1);
}
