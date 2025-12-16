// esbuild.config.mjs
import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'dist');
const meta   = (await fs.readFile(path.join(__dirname, 'meta.userscript.js'), 'utf8')).trim() + '\n';
await fs.mkdir(outDir, { recursive: true });

const baseOptions = {
  entryPoints: [path.join(__dirname, 'src', 'main.ts')],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  legalComments: 'none',
  write: false,
  logLevel: 'info',
  minify: true,
  sourcemap: false,
};

const arg = process.argv[2];

if (arg !== 'build' && arg !== 'release') {
  console.error('Usage: node esbuild.config.mjs [build|release]');
  process.exit(1);
}

const outName = arg === 'release' ? 'gemini.user.js' : 'gemini-build.user.js';

const result = await esbuild.build(baseOptions);
const code   = result.outputFiles?.[0]?.text;
if (!code) throw new Error('No outputFiles from esbuild');

const file = path.join(outDir, outName);
await fs.writeFile(file, meta + code, 'utf8');
console.log('✅ Built ->', file);
