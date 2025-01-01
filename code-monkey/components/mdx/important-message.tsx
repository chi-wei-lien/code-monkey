import { ReactNode } from "react";

interface ImportantMessageProps {
  children: ReactNode;
}

const ImportantMessage: React.FC<ImportantMessageProps> = ({ children }) => {
  return (
    <div className="rounded-md border-2 border-dashed border-themeBrown bg-yellow-200 p-4">
      <div className="font-bold">Important!</div>
      {children}
    </div>
  );
};

export default ImportantMessage;
