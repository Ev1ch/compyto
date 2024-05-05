import { Close, FileDownload, FileUpload } from '@mui/icons-material';
import { Button, Chip, Stack, SxProps } from '@mui/material';
import { memo, useCallback, useRef, useState } from 'react';

import { isJson } from '@compyto/utils';
import { EMPTY_OBJECT } from '@/constants';
import { useFileInput } from '@/hooks';
import { removePair, selectIsPairPresent } from '@/modules/analysis/store';
import { useFileDownload } from '@/modules/downloads/hooks';
import {
  ImportPopper,
  ImportStatus,
} from '@/modules/transfers/components/blocks';
import {
  EXPORT_EVENTS_FILE_NAME,
  IMPORT_FILE_OPTIONS,
  ImportStatus as TImportStatus,
} from '@/modules/transfers/constants';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';
import { pluralize, readFile } from '@/utils';

import { addProcess, selectEventsWithPreparers } from '../../../store';
import { parseJsonMonitoringData } from '../../../utils';

export interface MonitoringEventsTreeHeaderProps {
  readonly sx?: SxProps;
}

export default memo(function MonitoringEventsTreeHeader({
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeHeaderProps) {
  const dispatch = useDispatch();
  const eventsWithPreparers = useSelector(selectEventsWithPreparers);
  const isPairPresent = useSelector(selectIsPairPresent);
  const [isImportPopperOpen, setIsImportPopperOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<TImportStatus | null>(null);
  const importButtonRef = useRef<HTMLButtonElement | null>(null);
  const { download } = useFileDownload(
    JSON.stringify(eventsWithPreparers),
    EXPORT_EVENTS_FILE_NAME,
  );
  const { input } = useFileInput(IMPORT_FILE_OPTIONS);
  const eventsNumber = eventsWithPreparers.length;

  const handleDeselectClick = useCallback(() => {
    dispatch(removePair());
  }, [dispatch]);

  const handleImportFile = useCallback(async () => {
    try {
      setIsImportPopperOpen(false);
      setImportStatus(null);
      const files = await input();

      if (!files) {
        return;
      }

      setImportStatus(TImportStatus.PENDING);

      for (const file of files) {
        const string = await readFile(file);

        if (typeof string !== 'string' || !isJson(string)) {
          throw new Error('Invalid JSON');
        }

        const data = await parseJsonMonitoringData(string);
        dispatch(addProcess(data));
      }

      setImportStatus(TImportStatus.SUCCESS);
    } catch (error) {
      setImportStatus(TImportStatus.ERROR);
    }
  }, [input, dispatch]);

  const handleCancelImport = useCallback(() => {
    setIsImportPopperOpen(false);
  }, []);

  const handleImportClick = useCallback(() => {
    setImportStatus(null);

    handleImportFile();
  }, [handleImportFile]);

  return (
    <Stack sx={[{ alignItems: 'center' }, ...getArrayedSx(sx)]} direction="row">
      <Stack sx={{ width: 'calc(100% - 184px)' }} direction="row">
        <Button
          startIcon={<Close />}
          onClick={handleDeselectClick}
          disabled={!isPairPresent}
        >
          Deselect all
        </Button>

        <Chip
          sx={{
            mx: 'auto',
          }}
          label={`${eventsNumber} ${pluralize('event', eventsNumber)}`}
        />
      </Stack>

      <Stack direction="row">
        <Button
          sx={{ ml: 'auto' }}
          startIcon={<FileUpload />}
          onClick={handleImportClick}
          ref={importButtonRef}
          disabled={
            isImportPopperOpen || importStatus === TImportStatus.PENDING
          }
        >
          Import
        </Button>
        <Button
          sx={{ ml: 'auto' }}
          startIcon={<FileDownload />}
          onClick={download}
          disabled={!eventsNumber}
        >
          Export
        </Button>
      </Stack>

      {importButtonRef.current && isImportPopperOpen && (
        <ImportPopper
          anchor={importButtonRef.current}
          onCancel={handleCancelImport}
          onConfirm={handleImportFile}
        />
      )}

      {!!importStatus && <ImportStatus status={importStatus} />}
    </Stack>
  );
});
