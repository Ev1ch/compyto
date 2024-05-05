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
import { useDispatch, useSelector } from '@/store/hooks';

import Connector from '../Connector';
import MonitoringEvent from '../MonitoringEvent';

export interface MonitoringEventNodeProps {
  readonly event: TMonitoringEvent;
  readonly context: MonitoringContext;
}

const monitoringEventSx = {
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
  const position = useSelector((state) => selectPosition(state, eventId));
  const isUnfocused = useSelector((state) =>
    selectIsEventUnfocused(state, eventId),
  );
  const isSelected = useSelector((state) =>
    selectIsEventSelected(state, eventId),
  );
  const boxRef = useRef<HTMLDivElement | null>(null);

  const getPosition = useCallback(() => {
    const box = boxRef.current;

    if (!box) {
      return;
    }

    const { offsetTop, offsetHeight } = box;
    return { top: offsetTop, height: offsetHeight };
  }, []);

  const handleMutation = useCallback(() => {
    if (!boxRef.current) {
      return;
    }

    const position = getPosition();

    if (!position) {
      return;
    }

    const { top, height } = position;
    dispatch(updatePosition({ id: eventId, top, height }));
  }, [dispatch, eventId, getPosition]);

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
    if (!position) {
      return;
    }

    const currentPosition = getPosition();

    if (!currentPosition) {
      return;
    }

    if (
      position.top !== currentPosition.top ||
      position.height !== currentPosition.height
    ) {
      handleMutation();
    }
  }, [previousPosition, position, nextPosition, handleMutation, getPosition]);

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
          sx={{ mt: 1.25, mb: 'auto' }}
          width="100%"
          direction="left"
          thickness={1}
          size={6}
          rounded
        />
      )}
      <MonitoringEvent
        sx={monitoringEventSx}
        event={event}
        context={context}
        onKeyClick={handleKeyClick}
        onExpandToggle={handleMutation}
        unfocused={isUnfocused}
        selected={isSelected}
      />
      <Connector
        sx={[
          { mt: 1.25, mb: 'auto', flexShrink: 0 },
          isUnfocused && { opacity: 0.2 },
        ]}
        width={200}
      />
    </Box>
  );
});
