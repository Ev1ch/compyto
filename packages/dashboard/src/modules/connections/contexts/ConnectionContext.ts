import { createContext } from 'react';

import { Connection } from '../domain';

export interface ConnectionContextProps {
  monitoring: Connection;
}

const ConnectionContext = createContext<ConnectionContextProps | null>(null);

export default ConnectionContext;
