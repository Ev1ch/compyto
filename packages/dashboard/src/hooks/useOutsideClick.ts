import { RefObject, useEffect, useState } from 'react';

export default function useOutsideClick(ref: RefObject<HTMLElement>) {
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        setIsOutsideClick(true);
      } else {
        setIsOutsideClick(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return isOutsideClick;
}
