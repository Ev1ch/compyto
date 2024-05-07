import { Box } from '@mui/material';
import { memo, useCallback, useEffect, useRef } from 'react';

import type {
  MonitoringContext,
  MonitoringEvent as TMonitoringEvent,
} from '@compyto/monitoring';
import {
  addEventToPair,
  removeEventFromPair,
  removePosition,
  selectIsEventSelected,
  selectNextPosition,
  selectPosition,
  selectPreviousPosition,
  updatePosition,
} from '@/modules/analysis/store';
import { selectIsEventUnfocused } from '@/modules/monitoring/store';
import { getPosition } from '@/modules/monitoring/utils';
import { useDispatch, useSelector } from '@/store/hooks';

import Connector from '../Connector';
import MonitoringEvent from '../MonitoringEvent';

export interface MonitoringEventNodeProps {
  readonly event: TMonitoringEvent;
  readonly context: MonitoringContext;
}

const MONITORING_EVENT_SX = {
  ml: 'auto',
};

export default memo(function MonitoringEventNode({
  event,
  context,
}: MonitoringEventNodeProps) {
  const dispatch = useDispatch();
  const eventId = event.context.id;
  const previousPosition = useSelector((state) =>
    selectPreviousPosition(state, eventId),
  );
  const nextPosition = useSelector((state) =>
    selectNextPosition(state, eventId),
  );
  const storedPosition = useSelector((state) => selectPosition(state, eventId));
  const isUnfocused = useSelector((state) =>
    selectIsEventUnfocused(state, eventId),
  );
  const isSelected = useSelector((state) =>
    selectIsEventSelected(state, eventId),
  );
  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleMutation = useCallback(() => {
    setTimeout(() => {
      if (!boxRef.current) {
        return;
      }

      const position = getPosition(boxRef.current);

      if (!position) {
        return;
      }

      const { top, height } = position;
      if (storedPosition?.height !== height || storedPosition?.top !== top) {
        dispatch(updatePosition({ id: eventId, top, height }));
      }
    }, 0);
  }, [dispatch, eventId, storedPosition]);

  const handleKeyClick = useCallback(() => {
    if (isSelected) {
      dispatch(removeEventFromPair(eventId));
      dispatch(removePosition(eventId));
      return;
    }

    dispatch(addEventToPair(eventId));
    handleMutation();
  }, [isSelected, dispatch, handleMutation, eventId]);

  useEffect(() => {
    if (!storedPosition || !boxRef.current) {
      return;
    }

    const currentPosition = getPosition(boxRef.current);

    if (!currentPosition) {
      return;
    }

    if (
      storedPosition.top !== currentPosition.top ||
      storedPosition.height !== currentPosition.height
    ) {
      handleMutation();
    }
  }, [previousPosition, nextPosition]);

  return (
    <Box
      sx={[
        {
          display: 'flex',
          width: '100%',
        },
      ]}
      ref={boxRef}
    >
      {isSelected && (
        <Connector
          sx={{ mt: 1.75, mb: 'auto' }}
          width="100%"
          direction="left"
          thickness={2}
          size={6}
          rounded
        />
      )}
      <MonitoringEvent
        sx={MONITORING_EVENT_SX}
        event={event}
        context={context}
        onKeyClick={handleKeyClick}
        onExpandToggle={handleMutation}
        unfocused={isUnfocused}
        selected={isSelected}
      />
      <Connector
        sx={[
          { mt: 1.75, mb: 'auto', flexShrink: 0 },
          isUnfocused && { opacity: 0.2 },
        ]}
        width="15%"
      />
    </Box>
  );
});
