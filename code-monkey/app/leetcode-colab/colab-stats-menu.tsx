"use client";

import QuestionType from "@/types/QuestionType";
import UserType from "@/types/UserType";
import Link from "next/link";
import { useMemo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
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
  groupStats?: StackGraphData[];
  qsCount: number;
  doneCount: number;
  users: UserType[];
  notDoneQuestions: QuestionType[];
}

const ColabStatsMenu = ({
  doneCount,
  qsCount,
  notDoneQuestions,
  groupStats,
  users,
}: ColabStatsMenuProps) => {
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

  const completeness = useMemo(() => {
    if (qsCount === 0) return 0;
    return parseFloat(((doneCount / qsCount) * 100).toFixed(2));
  }, [doneCount, qsCount]);

  return (
    <div className="no-scrollbar min-h-28 overflow-y-scroll rounded-md bg-cardPrimary p-6 pb-4 shadow lg:h-[95%] lg:min-w-[20rem]">
      <div className="list-none text-sm font-medium text-fontMenu">
        <div className="rounded-lg border-2 border-dashed p-5">
          <h1 className="font-bold">Group Statistics</h1>
          <hr />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={groupStats}
              margin={{
                top: 30,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="done_date" />
              <YAxis tickFormatter={(value) => Math.round(value).toString()} />
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
        <div className="mt-6 rounded-lg border-2 border-dashed p-5">
          <div className="flex items-center gap-2 font-bold">
            <h1>Weekly Goal</h1>
            <div className="group relative">
              <IoInformationCircleOutline className="text-lg" />
              <span className="absolute left-1/2 z-10 mx-auto mt-2 hidden w-[150px] rounded-md bg-gray-800 p-4 text-sm text-gray-100 transition-opacity group-hover:block">
                Indicates how many questions you solved that are posted within
                this week
              </span>
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <div className="flex justify-between">
              <div>
                {doneCount} / {qsCount}
              </div>
              <div>{completeness}%</div>
            </div>
            <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-red-400 duration-200 ease-in"
                style={{ width: `${completeness}%` }}
              >
                <div className="h-full w-full translate-x-full transform bg-gray-200"></div>
              </div>
            </div>
          </div>
          {notDoneQuestions.map((question, i) => (
            <Link href={question.link} target="_blank" key={question.q_id}>
              <div className="group relative flex">
                <button className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {i + 1}. {question.name}
                </button>
                <span className="absolute top-5 scale-0 rounded bg-gray-800 p-2 text-xs text-white transition-all group-hover:scale-100">
                  {question.name}
                </span>
              </div>
            </Link>
          ))}
          {notDoneQuestions.length === 0 && (
            <div>Good job! You solved all questions posted this week!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColabStatsMenu;
