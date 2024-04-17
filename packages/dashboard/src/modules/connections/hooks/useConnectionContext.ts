import { useContext } from 'react';

import { ConnectionContext } from '../contexts';

export default function useConnectionContext() {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error(
      'useConnectionContext must be used within a ConnectionProvider',
    );
  }

  return context;
}
