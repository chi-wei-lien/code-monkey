"use client";

import Navbar from "@/components/navbar";
import ColabMenu from "./colab-menu";
import { useEffect } from "react";
import { getGroups } from "@/lib/api/group/getGroups";
import { redirect } from "next/navigation";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const redirectGroup = async () => {
      const groups = await getGroups();
      if (groups) {
        redirect(`/leetcode-colab/${groups[0].group_id}`);
      }
    };

    redirectGroup();
  }, []);

  return (
    <section className="min-w-screen min-h-screen bg-themeIvory lg:h-screen">
      <Navbar />
      <div className="flex h-full flex-col gap-5 px-8 pt-5 lg:flex-row lg:justify-between lg:pt-20">
        <ColabMenu />
        <div className="h-full flex-grow overflow-auto">{children}</div>
      </div>
      <div className="pb-10 lg:pb-0" />
    </section>
  );
};

export default GuideLayout;
