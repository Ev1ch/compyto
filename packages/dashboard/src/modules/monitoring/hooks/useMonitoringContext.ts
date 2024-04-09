import { useContext } from 'react';

import { MonitoringContext } from '../contexts';

export default function useMonitoringContext() {
  const context = useContext(MonitoringContext);

  if (!context) {
    throw new Error('Context must be used provided');
  }

  return context;
}
