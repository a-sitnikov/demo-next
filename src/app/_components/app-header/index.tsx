import { Avatar, Button, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import Compact from "antd/es/space/Compact";

export const AppHeader: React.FC = () => {
  return (
    <Header className="flex items-center justify-center gap-4">
      <div>Header</div>
      <Button type="primary" size="large">
        Каталог
      </Button>
      <Compact className="w-8/12">
        <Input size="large" />
        <Button type="primary" size="large">
          Найти
        </Button>
      </Compact>
      <Avatar size="large" />
    </Header>
  );
};
