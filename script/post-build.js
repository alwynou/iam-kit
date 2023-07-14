import fs from 'node:fs/promises'
import { URL, fileURLToPath } from 'node:url'

const path = fileURLToPath(new URL('../lib/index.d.ts', import.meta.url))

const indexTypeContet = await fs.readFile(path, 'utf8')

const replacedContent = indexTypeContet.replace(/index\.js/g, 'index')

await fs.writeFile(path, replacedContent, 'utf8')
