import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const mermaidPkg = JSON.parse(await readFile(resolve(root, 'node_modules/mermaid/package.json'), 'utf8'));

const common = {
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  write: false,
  logLevel: 'info',
};

function bundleText(result) {
  return result.outputFiles[0].text;
}

const mainResult = await build({
  ...common,
  entryPoints: [resolve(root, 'src/client.jsx')],
  external: ['react', 'react/jsx-runtime', 'react-dom'],
  minify: false,
});

const mainCode = bundleText(mainResult);
const mainBundle = `/*! ${pkg.name} v${pkg.version} | MIT */
window.__ModuleLoader__.load({
  id: ${JSON.stringify(pkg.name)},
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
${mainCode}
    return module.exports.createPlugin({
      loadMermaid: () => require.async('./client.mermaid.js'),
    });
  },
});
`;

await writeFile(resolve(root, 'client.js'), mainBundle, 'utf8');

const mermaidResult = await build({
  ...common,
  entryPoints: [resolve(root, 'src/mermaid-entry.js')],
  minify: true,
  legalComments: 'eof',
});

const mermaidCode = bundleText(mermaidResult);
const mermaidBundle = `/*! Mermaid v${mermaidPkg.version} | MIT License | https://github.com/mermaid-js/mermaid */
window.__ModuleLoader__.load({
  id: ${JSON.stringify(pkg.name)},
  chunk: 'client.mermaid.js',
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
    // Some Mermaid dependencies probe Node globals behind \`typeof process\`
    // guards. The Electron renderer may not expose them, so provide the small
    // browser-compatible surface those probes expect.
    var process = globalThis.process ?? {
      env: { NODE_ENV: 'production' },
      platform: typeof navigator === 'object' && /Windows/i.test(navigator.userAgent) ? 'win32' : 'browser',
      cwd: () => '/',
    };
${mermaidCode}
    return module.exports;
  },
});
`;

await writeFile(resolve(root, 'client.mermaid.js'), mermaidBundle, 'utf8');

console.log(`built client.js (${mainBundle.length} bytes)`);
console.log(`built client.mermaid.js (${mermaidBundle.length} bytes, mermaid ${mermaidPkg.version})`);
