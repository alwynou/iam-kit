import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src',
      format: 'esm',
      builder: 'mkdist',
      pattern: ['**', '!**/*.test.ts']
    },
    {
      input: './src',
      format: 'cjs',
      builder: 'mkdist',
      pattern: ['**', '!**/*.test.ts'],
      ext: 'cjs'
    }
  ],
  declaration: true
})
