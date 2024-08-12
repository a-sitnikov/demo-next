import AntdProvider from "./antd";
import StoreProvider from "./store";

const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <AntdProvider>{children}</AntdProvider>
    </StoreProvider>
  );
};

export default AppProviders;
