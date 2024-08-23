"use client";

interface IProps extends React.PropsWithChildren {
  title: React.ReactNode;
}

export const BlockWithHeader: React.FC<IProps> = ({ title, children }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h4 className="font-medium">{title}</h4>
      {children}
    </div>
  );
};
