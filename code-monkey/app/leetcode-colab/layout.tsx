"use client";

import Navbar from "@/components/navbar";
import ColabMenu from "./ColabMenu";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen lg:h-screen min-w-screen bg-bgPrimary">
      <Navbar />
      <div className="pt-16 px-8 h-full flex gap-5 flex-col lg:flex-row lg:justify-between">
        <ColabMenu />
        <div className="flex-grow h-full overflow-auto">{children}</div>
      </div>
      <div className="mb-10" />
    </section>
  );
};

export default GuideLayout;
