"use client";

import Navbar from "@/components/navbar";
import ColabMenu from "./colab-menu";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen lg:h-screen min-w-screen bg-themeIvory">
      <Navbar />
      <div className="pt-5 lg:pt-20 px-8 h-full flex gap-5 flex-col lg:flex-row lg:justify-between">
        <ColabMenu />
        <div className="flex-grow h-full overflow-auto">{children}</div>
      </div>
      <div className="pb-10 lg:pb-0" />
    </section>
  );
};

export default GuideLayout;
