import { EOL as eol } from 'node:os'
import fs from 'node:fs'
import { URL, fileURLToPath } from 'node:url'

const resolve = dir => fileURLToPath(new URL(dir, import.meta.url))

const dirs = fs.readdirSync(resolve('../src'))

const funcNames = dirs.filter(
  name => !name.startsWith('_') && !name.includes('.ts')
)

let fileContent = ''

for (const name of funcNames) {
  fileContent += `import { ${name} } from './${name}/index'${eol}`
}

fileContent += `${eol}const iamKit = {
  ${funcNames.join(`,${eol}  `)}
}${eol}`

fileContent += `${eol}export {
  ${funcNames.join(`,${eol}  `)},
  iamKit as default
}
`

fs.writeFileSync(resolve(`../src/index.ts`), fileContent, 'utf8')
