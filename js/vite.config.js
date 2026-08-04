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
        'core/qrcode': resolve(__dirname, 'src/main/core/qrcode.ts'),
        'renderers/gif': resolve(__dirname, 'src/main/renderers/gif.ts'),
        'renderers/ascii': resolve(__dirname, 'src/main/renderers/ascii.ts'),
        'renderers/table': resolve(__dirname, 'src/main/renderers/table.ts'),
        'renderers/svg': resolve(__dirname, 'src/main/renderers/svg.ts'),
        'renderers/canvas': resolve(__dirname, 'src/main/renderers/canvas.ts'),
        'encodings/sjis': resolve(__dirname, 'src/main/encodings/sjis.ts'),
        'encodings/utf8': resolve(__dirname, 'src/main/encodings/utf8.ts')
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
