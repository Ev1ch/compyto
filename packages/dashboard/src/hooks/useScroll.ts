import { RefObject, useCallback, useEffect, useState } from 'react';

export default function useScroll(ref: RefObject<HTMLElement>) {
  const [isDown, setIsDown] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const scrollUp = useCallback(() => {
    console.log(ref.current);
    ref.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [ref]);

  const scrollDown = useCallback(() => {
    const element = ref.current;

    element?.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
  }, [ref]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    function handleScroll() {
      console.log('scroll');
      if (element) {
        setIsDown(
          Math.abs(
            element.scrollHeight - (element.scrollTop + element.clientHeight),
          ) < 5,
        );
        setIsUp(element.scrollTop === 0);
        setIsScrollable(element.scrollHeight > element.clientHeight);
      }
    }

    element.addEventListener('scroll', handleScroll);
    const mutationObserver = new MutationObserver(handleScroll);
    mutationObserver.observe(element, { childList: true, subtree: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
      element.removeEventListener('resize', handleScroll);
      mutationObserver.disconnect();
    };
  }, [ref]);

  return {
    isDown,
    isUp,
    isScrollable,
    scrollUp,
    scrollDown,
  };
}
