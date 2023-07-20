import { alwynou, tsRules } from '@alwynou/eslint-config'

tsRules[0].languageOptions.parserOptions.project = ['./tsconfig.eslint.json']

export default alwynou([
  {
    ignores: ['**/lib'],
    rules: {
      'no-unused-vars': 'off'
    }
  }
])
