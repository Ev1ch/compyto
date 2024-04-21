import { Check, Close, ErrorOutline } from '@mui/icons-material';
import { Alert, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { memo, useCallback, useState } from 'react';

import { ImportStatus } from '../../../constants';

const IMPORT_STATUS_TO_MESSAGE_MAP = {
  [ImportStatus.PENDING]: 'Importing events...',
  [ImportStatus.SUCCESS]: 'Events are successfully imported',
  [ImportStatus.ERROR]: 'Error occurred while importing events',
};

const IMPORT_STATUS_TO_SEVERITY_MAP = {
  [ImportStatus.PENDING]: 'info',
  [ImportStatus.SUCCESS]: 'success',
  [ImportStatus.ERROR]: 'error',
} as const;

const IMPORT_STATUS_TO_ICON_MAP = {
  [ImportStatus.PENDING]: <CircularProgress size={22} />,
  [ImportStatus.SUCCESS]: <Check sx={{ fontSize: 22 }} />,
  [ImportStatus.ERROR]: <ErrorOutline sx={{ fontSize: 22 }} />,
};

const AUTO_HIDE_DURATION = 5000;

export interface MonitoringEventsImportStatusProps {
  status: ImportStatus;
}

export default memo(function MonitoringEventsImportStatus({
  status,
}: MonitoringEventsImportStatusProps) {
  const [isOpened, setIsOpened] = useState(true);
  const isClosable = [ImportStatus.SUCCESS, ImportStatus.ERROR].includes(
    status,
  );

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <Snackbar
      autoHideDuration={isClosable ? AUTO_HIDE_DURATION : undefined}
      onClose={handleClose}
      open={isOpened}
    >
      <Alert
        severity={IMPORT_STATUS_TO_SEVERITY_MAP[status]}
        icon={IMPORT_STATUS_TO_ICON_MAP[status]}
        variant="outlined"
        action={
          isClosable ? (
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          ) : undefined
        }
      >
        {IMPORT_STATUS_TO_MESSAGE_MAP[status]}
      </Alert>
    </Snackbar>
  );
});
