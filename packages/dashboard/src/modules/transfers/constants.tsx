import { Check, ErrorOutline } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

export const IMPORT_FILE_OPTIONS = {
  accept: '.json',
  multiple: true,
} as const;

export enum ImportStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const EXPORT_EVENTS_FILE_NAME = 'events.json';

export const IMPORT_STATUS_TO_MESSAGE_MAP = {
  [ImportStatus.PENDING]: 'Importing events...',
  [ImportStatus.SUCCESS]: 'Events are successfully imported',
  [ImportStatus.ERROR]: 'Error occurred while importing events',
};

export const IMPORT_STATUS_TO_SEVERITY_MAP = {
  [ImportStatus.PENDING]: 'info',
  [ImportStatus.SUCCESS]: 'success',
  [ImportStatus.ERROR]: 'error',
} as const;

export const IMPORT_STATUS_TO_ICON_MAP = {
  [ImportStatus.PENDING]: <CircularProgress size={22} />,
  [ImportStatus.SUCCESS]: <Check sx={{ fontSize: 22 }} />,
  [ImportStatus.ERROR]: <ErrorOutline sx={{ fontSize: 22 }} />,
};
