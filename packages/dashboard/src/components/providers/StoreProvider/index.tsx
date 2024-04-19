import { Provider } from 'react-redux';

import { store } from '@/store/logic';

import type { ProviderProps } from '../Provider';

export default function StoreProvider({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
