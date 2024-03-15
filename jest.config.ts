import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';

import tsconfig from './tsconfig.json';

const { baseUrl } = tsconfig.compilerOptions;

const CONFIG: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: [baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
};

export default CONFIG;
