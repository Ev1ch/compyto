import mock from 'jest-mock';

import type { Monitoring } from '@compyto/monitoring';

const monitoringMock: Monitoring = {
  on: mock.fn(),
  onAny: mock.fn(),
  off: mock.fn(),
  offAny: mock.fn(),
  emit: mock.fn(),
};

export default monitoringMock;
