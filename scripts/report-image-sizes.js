/**
 * Create a CSV report of image dimensions and file sizes under images/sections.
 * Usage:
 *   node scripts/report-image-sizes.js [outPath]
 *
 * Defaults to scripts/image-report-all.csv
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..', 'images', 'sections');
const OUT_PATH = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.resolve(__dirname, 'image-report-all.csv');
const ALLOWED = /\.(jpe?g|png|webp)$/i;

async function listFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const dirent of dirents) {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else if (ALLOWED.test(dirent.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function escapeCsv(value) {
  const str = `${value ?? ''}`;
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

async function main() {
  if (!fs.existsSync(ROOT)) {
    throw new Error(`Input directory not found: ${ROOT}`);
  }

  const files = await listFiles(ROOT);
  console.log(`Scanning ${files.length} files...`);

  const rows = [];

  for (const file of files) {
    const relPath = path.relative(path.resolve(__dirname, '..'), file).replace(/\\/g, '/');
    const stat = await fs.promises.stat(file);

    let meta;
    try {
      meta = await sharp(file).metadata();
    } catch (err) {
      console.warn(`Skip (metadata error) ${relPath}: ${err.message}`);
      continue;
    }

    rows.push({
      path: relPath,
      width: meta.width ?? '',
      height: meta.height ?? '',
      megabytes: (stat.size / 1_000_000).toFixed(2),
      format: (meta.format || '').toUpperCase(),
    });
  }

  rows.sort((a, b) => parseFloat(b.megabytes) - parseFloat(a.megabytes));

  const header = 'Path,Width,Height,Megabytes,Format\n';
  const body = rows
    .map((row) => [row.path, row.width, row.height, row.megabytes, row.format].map(escapeCsv).join(','))
    .join('\n');

  await fs.promises.writeFile(OUT_PATH, header + body, 'utf8');

  console.log(`Saved CSV to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
