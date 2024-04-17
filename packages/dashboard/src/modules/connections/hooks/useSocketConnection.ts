import { useCallback, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

import type { Connection } from '../domain';

export default function useSocketConnection(
  uri: string,
  code: string,
): Connection {
  const socket = useMemo(
    () =>
      io(uri, {
        autoConnect: false,
        auth: {
          code,
        },
      }),
    [uri, code],
  );
  const [isConnected, setIsConnected] = useState(socket.connected);

  const on = useCallback(socket.on.bind(socket), [socket]);

  const off = useCallback(socket.off.bind(socket), [socket]);

  const onAny = useCallback(socket.onAny.bind(socket), [socket]);

  const offAny = useCallback(socket.offAny.bind(socket), [socket]);

  const start = useCallback(() => {
    socket.connect();
  }, [socket]);

  const memo = useMemo(
    () => ({ start, on, off, onAny, offAny, isConnected }),
    [start, on, off, onAny, offAny, isConnected],
  );

  useEffect(() => {
    function handleConnect() {
      setIsConnected(true);
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.disconnect();
    };
  }, [socket]);

  // @ts-expect-error Socket events type mismatch
  return memo;
}
