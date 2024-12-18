import { robotoMono } from "@/app/fonts";
import { ReactNode } from "react";

interface InlineCodeProps {
  children: ReactNode;
}

const InlineCode = ({ children }: InlineCodeProps) => {
  return (
    <span
      className={`px-1 rounded-md bg-orange-100 border border-orange-300 text-slate-800 ${robotoMono.className}`}
    >
      {children}
    </span>
  );
};

export default InlineCode;
