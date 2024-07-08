import { Avatar, Button, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { Search } from "./search";

export const AppHeader: React.FC = () => {
  return (
    <Header className="flex items-center justify-center gap-4">
      <div>Logo</div>
      <Button type="primary" size="large">
        Каталог
      </Button>
      <Search />
      <Avatar size="large" />
    </Header>
  );
};
