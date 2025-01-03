"use client";

import { getGroups } from "@/lib/api/group/getGroups";
import { GroupType } from "@/types/GroupType";
import { useEffect, useState } from "react";
import { getCurrUserInfo } from "@/lib/auth";
import { BlackButton } from "@/components/buttons";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const ColabMenu = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onAuthFail = () => {
      redirect("sign-in");
    };

    const loadGroups = async () => {
      setGroups((await getGroups()) ?? []);
    };

    const { userId } = getCurrUserInfo(onAuthFail) || {};
    if (userId) {
      setIsLoggedIn(true);
      loadGroups();
    }
  }, []);

  return (
    <div className="no-scrollbar min-h-28 overflow-y-scroll rounded-md bg-cardPrimary p-6 shadow lg:h-[95%] lg:min-w-[20rem]">
      <div className={`list-none text-sm font-medium text-fontMenu`}>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-bold">Groups</h1>
          <BlackButton onClick={() => redirect("/leetcode-colab/create-group")}>
            Create Group
          </BlackButton>
        </div>
        <hr className="mt-2" />
        <div className="mt-2 pb-5">
          {isLoggedIn &&
            groups.map((group) => (
              <div className="flex justify-between" key={group.group_id}>
                <Link href={`/leetcode-colab/${group.group_id}`}>
                  {group.name}
                </Link>
                <div className="flex items-center gap-2">
                  {group.member_count} / {group.member_limit}
                  <FaUser />
                </div>
              </div>
            ))}
          {!isLoggedIn && <div>Sign in to view your groups!</div>}
        </div>
      </div>
    </div>
  );
};

export default ColabMenu;
