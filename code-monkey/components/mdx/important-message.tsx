import { ReactNode } from "react";

interface ImportantMessageProps {
  children: ReactNode;
}

const ImportantMessage: React.FC<ImportantMessageProps> = ({ children }) => {
  return (
    <div className="bg-yellow-200 border-2 border-themeBrown border-dashed p-4 rounded-md">
      <div className="font-bold">Important!</div>
      {children}
    </div>
  );
};

export default ImportantMessage;
