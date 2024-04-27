import mock from 'jest-mock';

import type { Monitoring } from '@compyto/monitoring';

const monitoringMock: Monitoring = {
  events: [],
  on: mock.fn(),
  onAny: mock.fn(),
  off: mock.fn(),
  offAny: mock.fn(),
  emit: mock.fn(),
  start: mock.fn(() => Promise.resolve()),
  waitForDashboard: mock.fn(() => Promise.resolve()),
};

export default monitoringMock;
