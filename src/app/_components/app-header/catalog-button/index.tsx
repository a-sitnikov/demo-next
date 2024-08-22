"use client";

import { useMemo } from "react";
import { Button, Dropdown } from "antd";
import useToken from "antd/es/theme/useToken";
import { useTranslation } from "@/i18n/client";
import { CategoryList } from "./category-list";

export const CatalogButton: React.FC = () => {
  const { t } = useTranslation();

  const [_, token] = useToken();

  const dropdownStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    }),
    [token],
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
        {t("header.catalog")}
      </Button>
    </Dropdown>
  );
};
