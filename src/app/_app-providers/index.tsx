import AntdProvider from "./antd";

const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <AntdProvider>{children}</AntdProvider>;
};

export default AppProviders;
