"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button, Input } from "antd";
import Compact from "antd/es/space/Compact";
import { useTranslation } from "@/i18n/client";
import { is } from "@/utils/type-guards";

export const _Search: React.FC = () => {
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(urlSearch);
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);

    if (event.type === "click") {
      updateURL(event.target.value);
    }
  };

  const onSearch = () => {
    updateURL(search);
  };

  const updateURL = (serachValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (is.empty(serachValue)) {
      newSearchParams.delete("search");
    } else {
      newSearchParams.set("search", serachValue);
    }

    const newSearchParamsStr = newSearchParams.toString();
    let newUrl = "/catalog";
    if (!is.empty(newSearchParamsStr)) {
      newUrl += "?" + newSearchParamsStr;
    }

    window.location.href = newUrl;
  };

  return (
    <Compact className="w-8/12">
      <Input
        size="large"
        value={search}
        onChange={handleChange}
        autoFocus
        onPressEnter={onSearch}
        allowClear
      />
      <Button type="primary" size="large" onClick={onSearch}>
        {t("find")}
      </Button>
    </Compact>
  );
};

export const Search = () => {
  return (
    <Suspense>
      <_Search />
    </Suspense>
  );
};
