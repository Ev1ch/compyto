import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { memo, useCallback, useState } from 'react';

import {
  IMPORT_STATUS_TO_ICON_MAP,
  IMPORT_STATUS_TO_MESSAGE_MAP,
  IMPORT_STATUS_TO_SEVERITY_MAP,
  ImportStatus as TImportStatus,
} from '@/modules/transfers/constants';

const AUTO_HIDE_DURATION = 5000;

export interface ImportStatusProps {
  status: TImportStatus;
}

export default memo(function ImportStatus({ status }: ImportStatusProps) {
  const [isOpened, setIsOpened] = useState(true);
  const isClosable = [TImportStatus.SUCCESS, TImportStatus.ERROR].includes(
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
