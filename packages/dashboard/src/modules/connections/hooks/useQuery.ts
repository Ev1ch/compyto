import { useMemo, useState } from 'react';

export default function useQuery() {
  const [query] = useState(new URLSearchParams(window.location.search));
  const memo = useMemo(() => ({ query }), [query]);

  return memo;
}
