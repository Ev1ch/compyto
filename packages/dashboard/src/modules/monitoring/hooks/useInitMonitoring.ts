import { useEffect } from 'react';

import { useMount } from '@/hooks';
import { useConnectionContext } from '@/modules/connections/hooks';
import { useDispatch } from '@/store/hooks';

import { addEvent } from '../store';

export default function useInitMonitoring() {
  const dispatch = useDispatch();
  const { monitoring } = useConnectionContext();

  useEffect(() => {
    // @ts-expect-error Monitoring event type mismatch
    function handleAnyEvent(key, context, ...args) {
      console.log('Monitoring event:', key, context, args);
      const emittedAt = new Date(context.emittedAt);

      dispatch(
        addEvent({
          key,
          context: {
            ...context,
            emittedAt,
          },
          args,
        }),
      );
    }

    monitoring.onAny(handleAnyEvent);

    return () => {
      monitoring.offAny(handleAnyEvent);
    };
  }, [dispatch, monitoring]);

  useMount(() => {
    monitoring.start();
  });
}
