import { ReactNode } from "react";

interface PracticeProblemProps {
  children: ReactNode;
}

const PracticeProblems: React.FC<PracticeProblemProps> = ({ children }) => {
  return (
    <div className="rounded-md border-2 border-dashed border-themeBrown p-4">
      <h1 className="text-[1.4rem] text-themeBrown">Practice Problems</h1>
      {children}
    </div>
  );
};

export default PracticeProblems;
