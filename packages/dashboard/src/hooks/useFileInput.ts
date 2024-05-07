import { useCallback, useEffect, useRef } from 'react';

import useMount from './useMount';

type Options = {
  accept?: string;
  multiple?: boolean;
};

export default function useFileInput(
  options: Options = {
    accept: '',
    multiple: false,
  },
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useMount(() => {
    inputRef.current = document.createElement('input');
    inputRef.current.type = 'file';
  });

  useEffect(() => {
    const inputElement = inputRef.current;

    if (!inputElement) {
      return;
    }

    inputElement.accept = options.accept || '';
    inputElement.multiple = !!options.multiple;
  }, [options]);

  const input = useCallback(() => {
    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.value = '';
      inputElement.click();
    }

    return new Promise<FileList | null>((resolve) => {
      inputElement?.addEventListener('change', () => {
        resolve(inputElement.files);
      });
      inputElement?.addEventListener('cancel', () => {
        resolve(null);
      });
    });
  }, []);

  return { input };
}
