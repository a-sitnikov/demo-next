import { ConfigProvider, ThemeConfig } from "antd";
import ru_RU from "antd/es/locale/ru_RU";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const theme: ThemeConfig = {
  cssVar: true,
  token: {
    fontFamily: "var(--default-font)",
    colorPrimary: "#FA7814",
  },
  components: {
    Layout: {
      headerBg: "white",
      bodyBg: "white",
    },
  },
};

const AntdProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme} locale={ru_RU}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
