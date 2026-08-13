import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: {
        'core/qrcode': resolve(__dirname, 'src/core/qrcode.ts'),
        'renderers/gif': resolve(__dirname, 'src/renderers/gif.ts'),
        'renderers/png': resolve(__dirname, 'src/renderers/png.ts'),
        'renderers/ascii': resolve(__dirname, 'src/renderers/ascii.ts'),
        'renderers/table': resolve(__dirname, 'src/renderers/table.ts'),
        'renderers/svg': resolve(__dirname, 'src/renderers/svg.ts'),
        'renderers/canvas': resolve(__dirname, 'src/renderers/canvas.ts'),
        'encodings/sjis': resolve(__dirname, 'src/encodings/sjis.ts'),
        'encodings/utf8': resolve(__dirname, 'src/encodings/utf8.ts')
      },
      fileName: (format, entryName) =>
        format == 'cjs'? `${entryName}.js` :
        format == 'es'? `${entryName}.mjs` :
        `${entryName}.${format}.js`,
      formats: ['cjs', 'es'],
    },
    rollupOptions : { output : { exports : 'named' } }
  },
  plugins: [
    dts({
      rollupTypes : false,
    })
  ]
});
