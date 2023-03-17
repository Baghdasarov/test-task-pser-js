module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.mjs', '**/?(*.)+(spec|test).mjs'],
  transform: {
    '^.+\\.mjs$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
}
