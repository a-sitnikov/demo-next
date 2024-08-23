"use client";

import { ConfigProvider, ThemeConfig } from "antd";
import ru_RU from "antd/es/locale/ru_RU";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const antdTheme: ThemeConfig = {
  token: {
    fontFamily: "var(--default-font)",
    colorPrimary: "#FA7814",
  },
};

const AntdProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={antdTheme} locale={ru_RU}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
