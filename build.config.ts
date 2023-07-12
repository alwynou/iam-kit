import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src',
      builder: 'mkdist',
      format: 'cjs',
      pattern: ['**/*.ts', '!**/*test*']
    },
    {
      input: './src',
      builder: 'mkdist',
      format: 'esm',
      pattern: ['**/*.ts', '!**/*test*']
    }
  ],
  outDir: 'lib',
  declaration: true
})
