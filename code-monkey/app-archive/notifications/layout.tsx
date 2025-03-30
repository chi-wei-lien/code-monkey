"use client";

import Navbar from "@/components/navbar";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-w-screen min-h-screen bg-themeIvory lg:h-screen">
      <Navbar />
      <div className="flex h-full flex-col gap-5 px-8 pt-5 lg:flex-row lg:justify-between lg:pt-20">
        <div className="lg:min-w-[20rem]"></div>
        <div className="h-full flex-grow overflow-auto">{children}</div>
      </div>
      <div className="pb-10 lg:pb-0" />
    </section>
  );
};

export default GuideLayout;
