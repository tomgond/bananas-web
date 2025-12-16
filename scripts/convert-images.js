/**
 * Generate standardized WebP derivatives for portfolio images.
 * - Thumb: 1200x1200 cover crop for grid tiles.
 * - Wide: max 2000px (long edge) for hero/lightbox/full bleed.
 *
 * Originals are untouched; outputs are written next to inputs under images/sections
 * using ASCII slugs: <slug>-thumb.webp and <slug>-wide.webp.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_ROOT = path.join(process.cwd(), 'images', 'sections');
const OUTPUT_ROOT = INPUT_ROOT; // write alongside originals
const THUMB_SIZE = 1200;
const WIDE_MAX = 2000;
const QUALITY = 82;

const slugCounts = new Map(); // dir -> Map<slug, count>

function assertInputRoot() {
  if (!fs.existsSync(INPUT_ROOT)) {
    throw new Error(`Input root not found: ${INPUT_ROOT}`);
  }
}

function slugify(name, dirKey) {
  let slug = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  if (!slug) slug = 'img';

  const dirMap = slugCounts.get(dirKey) ?? new Map();
  slugCounts.set(dirKey, dirMap);
  const count = dirMap.get(slug) ?? 0;
  dirMap.set(slug, count + 1);

  return count > 0 ? `${slug}-${count}` : slug;
}

function listImages(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listImages(fullPath));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function makeThumb(srcPath, destPath) {
  await sharp(srcPath)
    .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(destPath);
}

async function makeWide(srcPath, destPath) {
  await sharp(srcPath)
    .resize({ width: WIDE_MAX, height: WIDE_MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(destPath);
}

async function processFile(fullPath) {
  const relDir = path.relative(INPUT_ROOT, path.dirname(fullPath)) || '.';
  const dirKey = relDir;
  const baseName = path.basename(fullPath, path.extname(fullPath));
  const slug = slugify(baseName, dirKey);
  const outDir = path.join(OUTPUT_ROOT, relDir);
  const thumbPath = path.join(outDir, `${slug}-thumb.webp`);
  const widePath = path.join(outDir, `${slug}-wide.webp`);

  await ensureDir(outDir);

  if (!fs.existsSync(thumbPath)) {
    await makeThumb(fullPath, thumbPath);
    console.log(`thumb  -> ${path.relative(process.cwd(), thumbPath)}`);
  } else {
    console.log(`skip (exists) thumb -> ${path.relative(process.cwd(), thumbPath)}`);
  }

  if (!fs.existsSync(widePath)) {
    await makeWide(fullPath, widePath);
    console.log(`wide   -> ${path.relative(process.cwd(), widePath)}`);
  } else {
    console.log(`skip (exists) wide  -> ${path.relative(process.cwd(), widePath)}`);
  }
}

async function main() {
  assertInputRoot();
  const files = listImages(INPUT_ROOT);
  console.log(`Found ${files.length} images under ${path.relative(process.cwd(), INPUT_ROOT)}`);

  for (const file of files) {
    await processFile(file);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
