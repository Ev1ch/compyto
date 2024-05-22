import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ButtonGroup, IconButton, Stack, type SxProps } from '@mui/material';
import { memo, RefObject } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { useScroll } from '@/hooks';

export interface MonitoringEventsTreeFooterProps {
  readonly sx?: SxProps;
  readonly treeRef: RefObject<HTMLDivElement>;
}

export default memo(function MonitoringEventsTreeFooter({
  treeRef,
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeFooterProps) {
  const { isUp, isDown, isScrollable, scrollUp, scrollDown } =
    useScroll(treeRef);

  return (
    <Stack sx={sx} direction="row">
      <ButtonGroup
        sx={{ ml: 'auto' }}
        orientation="vertical"
        disabled={!isScrollable}
      >
        <IconButton onClick={scrollUp} disabled={isUp || !isScrollable}>
          <KeyboardArrowUp />
        </IconButton>
        <IconButton onClick={scrollDown} disabled={isDown || !isScrollable}>
          <KeyboardArrowDown />
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
});
