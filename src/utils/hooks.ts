import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ymKey } from "@/app/_app-providers/yandex-metrika";
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

declare const ym: any;

export const useYandexMetrika = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    ym(ymKey, "hit", url);
  }, [pathname, searchParams]);
};
