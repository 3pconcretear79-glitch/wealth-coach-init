module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json", jsx: "react-jsx" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^next/server$": "<rootDir>/__mocks__/next-server.ts",
  },
  modulePathIgnorePatterns: ["<rootDir>/app/"],
};
