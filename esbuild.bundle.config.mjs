// esbuild.bundle.config.mjs
import { build } from 'esbuild';

/**
 * Bundles the Insight Lite React+TS app into a single JS file.
 * This is for distribution (e.g., embedding in another app or serving from a Worker).
 */
async function run() {
  await build({
    entryPoints: ['src/main.tsx'],         // your SPA entry
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: 'dist/insight-lite.bundle.js',
    format: 'iife',                        // self-executing for browser
    platform: 'browser',
    target: ['es2019'],
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.js': 'js',
      '.jsx': 'jsx',
      '.css': 'css',
      '.scss': 'css'
    }
    // If you want React as peer dependency instead of inlined, uncomment:
    // external: ['react', 'react-dom']
  });

  console.log('✅ Insight Lite bundled to dist/insight-lite.bundle.js');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
