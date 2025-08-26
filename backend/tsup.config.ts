import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  outDir: 'dist',
  format: ['esm'],              // or 'cjs' if you're using require()
  target: 'node18',
  sourcemap: true,
  clean: true,
  minify: false,
  dts: false,                   // Set to true if you want .d.ts files
  bundle: false,                // ❗ DO NOT bundle (preserves folder structure)
});
