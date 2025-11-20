const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Thư mục Next.js
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Hỗ trợ alias như @/components
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
