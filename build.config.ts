import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src',
      format: 'esm',
      builder: 'mkdist'
    },
    {
      input: './src',
      format: 'cjs',
      builder: 'mkdist'
    }
  ],
  declaration: true
})
