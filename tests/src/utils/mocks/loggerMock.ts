import mock from 'jest-mock';

import type { Logger } from '@compyto/logging';

const loggerMock: Logger = {
  error: mock.fn(),
  warn: mock.fn(),
  info: mock.fn(),
  event: mock.fn(),
};

export default loggerMock;
