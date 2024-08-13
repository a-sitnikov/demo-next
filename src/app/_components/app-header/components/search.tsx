"use client";

import { is } from "@/utils/type-guards";
import { Button, Input } from "antd";
import Compact from "antd/es/space/Compact";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const Search: React.FC = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") || "");

  const { push } = useRouter();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const onSearch = () => {
    if (is.empty(search)) {
      push("/catalog");
    } else {
      push("/catalog?search=" + search);
    }
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
        {"Найти"}
      </Button>
    </Compact>
  );
};
