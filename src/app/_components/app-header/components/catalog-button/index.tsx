"use client";

import { Button, Dropdown } from "antd";
import useToken from "antd/es/theme/useToken";
import { useMemo } from "react";
import { CategoryList } from "./category-list";

export const CatalogButton: React.FC = () => {
  const [_, token] = useToken();

  const dropdownStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    }),
    [token]
  );

  const dropdownRender = () => {
    return (
      <div style={dropdownStyle} className="p-2">
        <CategoryList />
      </div>
    );
  };

  return (
    <Dropdown trigger={["click"]} dropdownRender={dropdownRender}>
      <Button type="primary" size="large">
        Каталог
      </Button>
    </Dropdown>
  );
};
