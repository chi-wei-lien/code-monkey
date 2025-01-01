import { robotoMono } from "@/app/fonts";
import { ReactNode } from "react";

interface InlineCodeProps {
  children: ReactNode;
}

const InlineCode = ({ children }: InlineCodeProps) => {
  return (
    <span
      className={`rounded-md border border-orange-300 bg-orange-100 px-1 text-slate-800 ${robotoMono.className}`}
    >
      {children}
    </span>
  );
};

export default InlineCode;
