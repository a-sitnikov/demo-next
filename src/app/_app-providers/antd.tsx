import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontFamily: "var(--Inter)",
  },
  components: {
    Layout: {
      headerBg: "white",
    },
  },
};

const AntdProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
