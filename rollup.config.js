import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

const input = './src/index.ts'
const dir = 'dist'

export default defineConfig([
  {
    input,
    output: [
      {
        dir,
        format: 'esm',
        preserveModules: true,
        entryFileNames: '[name].mjs',
        preserveModulesRoot: 'src',
        exports: 'named'
      },
      {
        dir,
        format: 'cjs',
        preserveModules: true,
        entryFileNames: '[name].cjs',
        preserveModulesRoot: 'src',
        exports: 'named'
      }
    ],
    plugins: [
      esbuild({
        target: 'es2016'
      })
    ]
  },
  {
    input,
    output: {
      file: `./${dir}/index.d.ts`,
      format: 'esm'
    },
    plugins: [dts()]
  }
])
