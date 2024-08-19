import { Spin } from "antd";

export const Loader = () => {
  return (
    <div className="h-screen flex items-center fixed">
      <Spin spinning />
    </div>
  );
};
