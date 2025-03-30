import { ReactNode } from "react";

interface PracticeProblemProps {
  children: ReactNode;
}

const PracticeProblems: React.FC<PracticeProblemProps> = ({ children }) => {
  return (
    <div className="rounded-md border-2 border-dashed border-themeBrown p-4">
      {children}
    </div>
  );
};

export default PracticeProblems;
