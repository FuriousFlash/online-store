module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "<rootDir>/tests/**/*.test.js",
    "<rootDir>/tests/**/**/*.test.js",
  ],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
};
