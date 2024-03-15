import type { JestConfigWithTsJest } from 'ts-jest';

import tsconfig from './tsconfig.json';

const CONFIG: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', tsconfig.compilerOptions.baseUrl],
};

export default CONFIG;
