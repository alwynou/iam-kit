import { all } from '@alwynou/eslint-config'
import { defineFlatConfig } from 'eslint-define-config'

export default defineFlatConfig([{ ignores: ['**/lib'] }, ...all])
