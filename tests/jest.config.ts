import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';

import tsconfig from './tsconfig.json';

const { baseUrl, paths } = tsconfig.compilerOptions;

const CONFIG: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  modulePaths: [baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(paths),
};

export default CONFIG;
