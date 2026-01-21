/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  transform: {},
  testMatch: ["**/tests/**/*.test.js"],
  moduleNameMapper: {
    "^#src/(.*)$": "<rootDir>/src/$1",
  },
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
};

export default config;
