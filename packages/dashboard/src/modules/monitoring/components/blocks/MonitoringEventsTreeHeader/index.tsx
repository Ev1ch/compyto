import { Close, FileDownload, FileUpload } from '@mui/icons-material';
import { Button, Chip, Stack, SxProps } from '@mui/material';
import { memo, useCallback, useRef, useState } from 'react';

import { isJson } from '@compyto/utils';
import { EMPTY_OBJECT } from '@/constants';
import { useFileInput } from '@/hooks';
import { removePair, selectIsPairPresent } from '@/modules/analysis/store';
import { useFileDownload } from '@/modules/downloads/hooks';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';
import { pluralize, readFile } from '@/utils';

import {
  EXPORT_EVENTS_FILE_NAME,
  IMPORT_FILE_OPTIONS,
  ImportStatus,
} from '../../../constants';
import { selectEventsWithPreparers, setEvents } from '../../../store';
import { parseJsonMonitoringEvents } from '../../../utils';
import MonitoringEventsImportPopper from '../MonitoringEventsImportPopper';
import MonitoringEventsImportStatus from '../MonitoringEventsImportStatus';

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
  const [importStatus, setImportStatus] = useState<ImportStatus | null>(null);
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

      const file = files.item(0);

      if (!file) {
        return;
      }

      setImportStatus(ImportStatus.PENDING);

      const string = await readFile(file);

      if (typeof string !== 'string' || !isJson(string)) {
        throw new Error('Invalid JSON');
      }

      const events = await parseJsonMonitoringEvents(string);
      dispatch(setEvents(events));
      setImportStatus(ImportStatus.SUCCESS);
    } catch (error) {
      setImportStatus(ImportStatus.ERROR);
    }
  }, [input, dispatch]);

  const handleCancelImport = useCallback(() => {
    setIsImportPopperOpen(false);
  }, []);

  const handleImportClick = useCallback(() => {
    setImportStatus(null);

    if (eventsNumber) {
      setIsImportPopperOpen(true);
      return;
    }

    handleImportFile();
  }, [eventsNumber, handleImportFile]);

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
          disabled={isImportPopperOpen || importStatus === ImportStatus.PENDING}
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
        <MonitoringEventsImportPopper
          anchor={importButtonRef.current}
          onCancel={handleCancelImport}
          onConfirm={handleImportFile}
        />
      )}

      {!!importStatus && <MonitoringEventsImportStatus status={importStatus} />}
    </Stack>
  );
});
