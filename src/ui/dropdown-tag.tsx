"use client";

import { Dropdown, Tag } from "antd";
import useToken from "antd/es/theme/useToken";
import { is } from "@/utils/type-guards";

interface IProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  dropdown: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const DropdownTag: React.FC<IProps> = ({ title, subtitle, dropdown, onClose }) => {
  const [_, token] = useToken();

  const overlayStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: token.paddingSM,
  };

  const dropdownRender = () => {
    return <div style={overlayStyle}>{dropdown}</div>;
  };

  if (is.empty(dropdown)) {
    return (
      <Tag closable className="!flex items-center cursor-pointer" onClose={onClose}>
        {title}
        {subtitle && <span className="c-text-light pl-1">{subtitle}</span>}
      </Tag>
    );
  }

  return (
    <Dropdown
      trigger={["click"]}
      dropdownRender={dropdownRender}
      overlayClassName="max-w-72"
      destroyPopupOnHide
    >
      <Tag closable className="!flex items-center cursor-pointer" onClose={onClose}>
        {title}
        {subtitle && <span className="c-text-light pl-1">{subtitle}</span>}
      </Tag>
    </Dropdown>
  );
};
