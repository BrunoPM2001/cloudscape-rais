//  Not in use
import { useCallback, useEffect } from "react";

/**
 * Hook take from https://github.com/wojtekmaj/react-hooks/blob/main/src/useResizeObserver.ts
 * All the credits to the user https://github.com/wojtekmaj
 */
export default function useResizeObserver(element, observerCallback) {
  useCallback(() => {
    if (!element || !("ResizeObserver" in window)) {
      return undefined;
    }

    const observer = new ResizeObserver(observerCallback);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, observerCallback]);
}
