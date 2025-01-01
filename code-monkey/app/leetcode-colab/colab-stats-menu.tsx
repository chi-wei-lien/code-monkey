"use client";

import { getGroupStats } from "@/lib/api/group/getGroupStat";
import getUsers from "@/lib/api/users/getUsers";
import UserType from "@/types/UserType";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ColabStatsMenuProps {
  groupId: number;
  completed: number;
}

const ColabStatsMenu = ({ groupId, completed }: ColabStatsMenuProps) => {
  const [groupStats, setGroupStats] = useState();
  const [users, setUsers] = useState<UserType[]>([]);

  const colors = [
    "#f87171", // red-400
    "#fb923c", // orange-400
    "#fbbf24", // amber-400
    "#a3e635", // lime-400
    "#22d3ee", // cyan-400
    "#60a5fa", // blue-400
    "#a78bfa", // violet-400
    "#f472b6", // pink-400
  ];

  useEffect(() => {
    const loadStats = async () => {
      const myData = await getGroupStats(groupId);
      setGroupStats(myData ?? []);

      const userData = await getUsers(groupId, () => {});
      setUsers(userData ?? []);
    };
    loadStats();
  }, [groupId, completed]);

  return (
    <div className="min-h-28 md:h-[95%] no-scrollbar md:min-w-[20rem] overflow-y-scroll bg-cardPrimary pt-4 rounded-md shadow">
      <div className={`text-fontMenu text-sm list-none font-medium pr-4`}>
        <h1 className="ml-6 font-bold">Statistics</h1>
        <hr className="ml-4" />
        <div className="flex justify-center">
          <div className="h-[20rem] w-[20rem] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={groupStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="done_date" />
                <YAxis
                  tickFormatter={(value) => Math.round(value).toString()}
                />
                <Tooltip />
                <Legend />
                {users.map((user, i) => (
                  <Bar
                    key={user.id}
                    dataKey={user.username}
                    stackId="a"
                    fill={colors[i % colors.length]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColabStatsMenu;
