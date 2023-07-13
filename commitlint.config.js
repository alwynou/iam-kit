// eslint-disable-next-line unicorn/prefer-module
import fg from 'fast-glob'

function getPackages(packagePath) {
  return fg.sync('*', { cwd: packagePath, onlyDirectories: true })
}

// eslint-disable-next-line unicorn/prefer-module
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'pref',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],

    'scope-enum': [2, 'always', [...getPackages('src')]],

    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always']
  }
}
