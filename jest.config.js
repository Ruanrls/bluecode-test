module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/**/*.spec.ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  }
};