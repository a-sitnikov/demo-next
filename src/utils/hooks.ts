import { useCallback, useLayoutEffect, useState } from "react";
import { isServer } from "./common";

export const useIsClientReady = () => {
  const [isClientReady, setIsClientReady] = useState(false);

  useLayoutEffect(() => {
    setIsClientReady(true);
  }, []);

  return { isClientReady };
};

export const useToggle = (initial: boolean = false) => {
  const [status, setStatus] = useState(initial);

  const toggle = useCallback(() => {
    setStatus((prevStatus) => !prevStatus);
  }, []);

  return { status, setStatus, toggle };
};
