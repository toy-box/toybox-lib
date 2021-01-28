import { useEffect, useState } from 'react';
import { Target } from 'ahooks/lib/useScroll';
import { getTargetElement } from 'ahooks/lib/utils/dom';

interface Size {
  height: number;
  width: number;
}

function useScollSize(target: Target) {
  const [size, setSize] = useState<Size>({
    height: NaN,
    width: NaN,
  });

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) return;

    function updateSize(currentTarget: Target): void {
      let newSize;
      if (currentTarget === document) {
        if (!document.documentElement) return;
        newSize = {
          height: document.documentElement.scrollHeight,
          width: document.documentElement.scrollWidth,
        };
      } else {
        newSize = {
          height: (currentTarget as HTMLElement).scrollHeight,
          width: (currentTarget as HTMLElement).scrollWidth,
        };
      }
      setSize(newSize);
    }
    updateSize(el as Target);
    function listener(event: Event): void {
      if (!event.target) return;
      updateSize(event.target as Target);
    }
    el.addEventListener('scroll', listener);
    return () => {
      el.removeEventListener('scroll', listener);
    };
  }, [target]);

  return size;
}

export default useScollSize;
