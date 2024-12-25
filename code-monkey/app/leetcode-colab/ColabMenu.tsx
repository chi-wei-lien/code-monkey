"use client";

import { getGroups } from "@/lib/api/group/getGroups";
import { GroupType } from "@/types/GroupType";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrUserInfo } from "@/lib/auth";
import { BlackButton } from "@/components/buttons";

const ColabMenu = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadGroups = async () => {
      setGroups((await getGroups()) ?? []);
    };

    const { userId } = getCurrUserInfo() || {};
    if (userId) {
      setIsLoggedIn(true);
      loadGroups();
    }
  }, []);

  return (
    <div className="min-h-28 md:h-[95%] no-scrollbar md:min-w-[20rem] overflow-y-scroll bg-cardPrimary pt-4 rounded-md shadow">
      <div className={`text-fontMenu text-sm list-none font-medium pr-4`}>
        <div className="flex gap-2 items-center justify-between">
          <h1 className="ml-6 font-bold">Groups</h1>
          <BlackButton>Create Group</BlackButton>
        </div>
        <hr className="ml-4 mt-2" />
        <div className="ml-6 mt-2 pb-5">
          {isLoggedIn && groups.map((group) => <div>{group.name}</div>)}
          {!isLoggedIn && <div>Sign in to view your groups!</div>}
        </div>
      </div>
    </div>
  );
};

export default ColabMenu;
