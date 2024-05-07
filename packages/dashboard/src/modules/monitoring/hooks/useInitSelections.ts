import { useEffect } from 'react';

import { removePair } from '@/modules/analysis/store';
import { useDispatch, useSelector } from '@/store/hooks';

import { selectShownEvents } from '../store';

export default function useInitSelections() {
  const dispatch = useDispatch();
  const shownEvents = useSelector(selectShownEvents);

  useEffect(
    () => () => {
      dispatch(removePair());
    },
    [shownEvents, dispatch],
  );
}
