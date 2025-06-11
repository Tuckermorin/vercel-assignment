const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './tucker-vercel-project' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tucker-vercel-project/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/tucker-vercel-project/**/__tests__/**/*.(test|spec).ts?(x)'],
};

module.exports = createJestConfig(customJestConfig);
