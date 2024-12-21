"use client";

import { useEffect, useState } from "react";
import getQuestions from "@/lib/api/question/getQuestions";
import QuestionType from "@/types/QuestionType";
import Done from "./Done";
import { PrimaryButton } from "@/components/buttons";
import { redirect } from "next/navigation";
import { getCurrUserInfo } from "@/lib/auth";

const LeetCodeColabPage = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [qNameQuery, setQNameQuery] = useState("");
  const [queryNotCompleted, setQueryNotCompleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [completed, setCompleted] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [userId, setUserId] = useState<number | undefined>();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const { username, userId } = getCurrUserInfo() || {};
    if (username) {
      setIsLoggedIn(true);
      setUsername(username);
      setUserId(userId);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    const onLoad = async () => {
      const q_data = await getQuestions(
        qNameQuery,
        isLoggedIn,
        queryNotCompleted,
        userId,
        selectedUser
      );

      if (q_data) {
        setQuestions(q_data);
      }
    };

    if (hasLoaded) onLoad();
  }, [qNameQuery, selectedUser, queryNotCompleted, hasLoaded]);

  const handleAddQuestion = () => {
    redirect("/leetcode-colab/add-question");
  };

  return (
    <div className="h-[95%] w-full overflow-x-scroll overflow-y-scroll bg-cardPrimary rounded-md shadow p-10">
      <div className="flex items-center justify-between">
        {isLoggedIn && (
          <PrimaryButton type="button" onClick={handleAddQuestion}>
            Add Question
          </PrimaryButton>
        )}
        <div className="py-3">
          <div className="relative max-w-xs border rounded-lg">
            <label className="sr-only">Search</label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="text-black block w-full px-3 py-2 text-sm rounded-lg shadow-sm ps-9 focus:z-10 focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Search for items"
              value={qNameQuery}
              onChange={(e) => setQNameQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg
                className="text-gray-400 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <table className="min-w-full border divide-y divide-gray-200 rounded-md">
        <thead className="bg-fontLogo">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
            >
              No.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-white uppercase text-start text-nowrap"
            >
              Posted By
            </th>
            {isLoggedIn && (
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
              >
                Completed
              </th>
            )}
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
            >
              Solution
            </th>
            {isLoggedIn && (
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-white uppercase text-end"
              >
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="overflow-visible divide-y divide-gray-200">
          {questions.map((question, index) => {
            return (
              <Done
                question={question}
                myUsername={username}
                key={question.q_id}
                completed={completed}
                setCompleted={setCompleted}
                isLoggedIn={isLoggedIn}
                number={questions.length - index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeetCodeColabPage;
