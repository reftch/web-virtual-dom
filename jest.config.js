module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@core': '<rootDir>/packages/web-core/src/core',
    '@store': '<rootDir>/packages/web-core/src/store',
    '@components': '<rootDir>/packages/web-components/src',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: __dirname,
  collectCoverageFrom: [
    '<rootDir>/packages/web-core/src/core/**/*.[jt]s?(x)',
    '<rootDir>/packages/web-components/src/**/*.[jt]s?(x)',
  ],
  testMatch: [
    '<rootDir>/packages/web-core/__tests__/**/*spec.[jt]s?(x)',
    '<rootDir>/packages/web-components/__tests__/**/*spec.[jt]s?(x)',
  ],
}
