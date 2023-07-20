import { all, typescript } from '@alwynou/eslint-config'
import { defineFlatConfig } from 'eslint-define-config'

typescript[0].languageOptions.parserOptions.project = ['./tsconfig.eslint.json']

export default defineFlatConfig([
  { ignores: ['**/lib'] },
  ...all,
  {
    rules: {
      'no-unused-vars': 'off'
    }
  }
])
