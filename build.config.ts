import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src',
      builder: 'mkdist',
      declaration: true,
      format: 'cjs',
      pattern: ['**/*.ts', '!**/*test*']
    },
    {
      input: './src',
      builder: 'mkdist',
      declaration: true,
      format: 'esm',
      pattern: ['**/*.ts', '!**/*test*']
    },
    {
      input: './src/index',
      builder: 'rollup',
      declaration: true
    }
  ],
  outDir: 'lib',
  rollup: {
    emitCJS: true
  }
})
