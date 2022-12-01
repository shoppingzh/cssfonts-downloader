import * as path from 'path'
import { defineConfig } from 'rollup'
import alias from '@rollup/plugin-alias'
import sizes from '@atomico/rollup-plugin-sizes'
import ts from '@rollup/plugin-typescript'
import beep from '@rollup/plugin-beep'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'

export default defineConfig({
  input: ['src/index.ts'],
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'IconfontDownload'
  },
  plugins: [
    alias({
      entries: [{
        find: '@',
        replacement: 'src'
      }]
    }),
    clear({
      targets: ['dist']
    }),
    ts({
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
    }),
    sizes(100),
    terser(),
    beep(),
  ]
})
