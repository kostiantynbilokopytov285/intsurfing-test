module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    extends: [
      'standard-with-typescript',
      'eslint:recommended',
      'plugin:react/recommended',
      'prettier'
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['tsconfig.json']
    },
    plugins: ['react', 'simple-import-sort'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    },
    overrides: [
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        rules: {
          'simple-import-sort/imports': [
            'error',
            {
              groups: [
                // Packages `react` related packages come first.
                ['^react', '^@?\\w'],
                // Internal packages.
                ['^(@|common)(/.*|$)'],
                ['^(@|hooks)(/.*|$)'],
                ['^(@|modules)(/.*|$)'],
                // Side effect imports.
                ['^\\u0000'],
                // Parent imports. Put `..` last.
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                // Other relative imports. Put same-folder imports and `.` last.
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                // Style imports.
                ['^.+\\.?(css)$'],
                ['^.+\\.?(styles)$']
              ]
            }
          ]
        }
      }
    ]
  }
  