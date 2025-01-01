"use client";

import { useEffect } from "react";
import { getGroups } from "@/lib/api/group/getGroups";
import { redirect } from "next/navigation";

const DefaultPage = () => {
  useEffect(() => {
    const redirectGroup = async () => {
      const groups = await getGroups();
      if (groups) {
        redirect(`/leetcode-colab/${groups[0].group_id}`);
      }
    };

    redirectGroup();
  }, []);
  return <div>default page</div>;
};

export default DefaultPage;
