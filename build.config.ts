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
    }
  ],
  outDir: 'lib'
})
