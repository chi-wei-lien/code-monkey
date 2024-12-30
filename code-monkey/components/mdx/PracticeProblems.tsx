import { ReactNode } from "react";

interface PracticeProblemProps {
  children: ReactNode;
}

const PracticeProblems: React.FC<PracticeProblemProps> = ({ children }) => {
  return (
    <div className="border-2 border-themeBrown border-dashed p-4 rounded-md">
      <h1 className="text-[1.4rem] text-themeBrown">Practice Problems</h1>
      {children}
    </div>
  );
};

export default PracticeProblems;
