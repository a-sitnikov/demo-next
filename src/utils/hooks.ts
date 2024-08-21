import { useCallback, useRef, useState } from "react";
import { is } from "./type-guards";

export const useLoading = (initialStatus = false) => {
  const [loading, setLoading] = useState<boolean>(initialStatus);

  const loadingArrRef = useRef<boolean[]>([]);
  const startLoading = useCallback(() => {
    setLoading(true);
    loadingArrRef.current.push(true);
  }, []);

  const finishLoading = useCallback(() => {
    if (is.empty(loadingArrRef.current)) return;

    loadingArrRef.current.pop();
    if (is.empty(loadingArrRef.current)) {
      setLoading(false);
    }
  }, []);

  return { loading, startLoading, finishLoading };
};
