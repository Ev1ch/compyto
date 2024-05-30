import mock from 'jest-mock';

import type { Logger } from '@compyto/logging';

const loggerMock: Logger = {
  logContext: mock.fn(),
  logEvent: mock.fn(),
};

export default loggerMock;
