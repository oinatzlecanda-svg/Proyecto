// Builds the files that go to Shopify from the readable sources in this folder.
//
//   node tools/build.mjs <node_modules dir with csso + terser>
//
// - assets/o3.css is split by page (tools/split_css.py) into o3.css, o3-pages.css
//   and o3-product.css, then minified.
// - assets/o3.js and Dawn's vendor/global.js are minified with terser.
// - Dawn's vendor/base.css is minified.
// Output: dist/assets/. Minification is whitespace/comment only (csso without
// restructuring) so the cascade order never changes.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const modules = process.argv[2];
const themeRoot = process.argv[3]; // full theme copy, read by split_css.py
const require = createRequire(join(modules, 'noop.js'));
const csso = require('csso');
const { minify } = require('terser');

const out = join(root, 'dist', 'assets');
mkdirSync(out, { recursive: true });
const report = [];
const write = (name, src, min) => {
  writeFileSync(join(out, name), min);
  report.push(`${name.padEnd(16)} ${String(src.length).padStart(7)} -> ${String(min.length).padStart(7)} bytes`);
};

// CSS: split, then minify each part
const tmp = mkdtempSync(join(tmpdir(), 'o3-split-'));
execFileSync('python3', [join(here, 'split_css.py'), join(root, 'assets', 'o3.css'), tmp, themeRoot], { stdio: 'inherit' });
for (const name of ['o3.css', 'o3-pages.css', 'o3-product.css']) {
  const src = readFileSync(join(tmp, name), 'utf8');
  write(name, src, csso.minify(src, { restructure: false, comments: false }).css);
}
const base = readFileSync(join(root, 'vendor', 'base.css'), 'utf8');
write('base.css', base, csso.minify(base, { restructure: false, comments: false }).css);

// JS
const js = async (name, path) => {
  const src = readFileSync(path, 'utf8');
  const res = await minify(src, { compress: { passes: 2 }, mangle: true, keep_classnames: true, format: { comments: false } });
  write(name, src, res.code);
};
await js('o3.js', join(root, 'assets', 'o3.js'));
await js('global.js', join(root, 'vendor', 'global.js'));

console.log(report.join('\n'));
