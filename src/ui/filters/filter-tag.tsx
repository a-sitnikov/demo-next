"use client";

import { CSSProperties, useCallback, useMemo } from "react";
import { Dropdown, MenuProps, Tag } from "antd";
import useToken from "antd/es/theme/useToken";

interface IProps {
  title: string;
  count?: number;
  filter: React.ReactNode;
}

export const FilterTag: React.FC<IProps> = ({ title, count, filter }) => {
  const [_, token] = useToken();

  const overlayStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: token.paddingSM,
  };

  const dropdownRender = () => {
    return <div style={overlayStyle}>{filter}</div>;
  };

  return (
    <Dropdown trigger={["click"]} dropdownRender={dropdownRender}>
      <Tag closable className="cursor-pointer">
        {title}
        {count && <span className="text-sm c-text-light pl-1">+{count}</span>}
      </Tag>
    </Dropdown>
  );
};
