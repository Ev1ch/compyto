import { useCallback, useMemo } from 'react';

export default function useFileDownload(
  content: string,
  filename = 'file.txt',
) {
  const download = useCallback(() => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    a.click();
  }, [content, filename]);
  const memo = useMemo(
    () => ({
      download,
    }),
    [download],
  );

  return memo;
}
