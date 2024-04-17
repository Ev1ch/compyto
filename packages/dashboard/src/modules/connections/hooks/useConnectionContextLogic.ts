import { useMemo } from 'react';

import useQuery from './useQuery';
import useSocketConnection from './useSocketConnection';

export default function useConnectionContextLogic() {
  const { query } = useQuery();
  const uri = query.get('uri')!;
  const code = query.get('code')!;
  const monitoring = useSocketConnection(uri, code);
  const memo = useMemo(() => ({ monitoring }), [monitoring]);

  return memo;
}
