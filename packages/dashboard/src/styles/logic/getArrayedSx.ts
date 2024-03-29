import { SxProps } from '@mui/material';

export default function getArrayedSx(sx: SxProps) {
  return Array.isArray(sx) ? sx : [sx];
}
