import { useEffect } from 'react';

import type { Noop } from '@/utils';

export default function useMount(callback: Noop) {
  useEffect(() => {
    return callback();
  }, []);
}
