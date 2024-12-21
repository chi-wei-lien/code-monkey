"use client";

import { useEffect, useState } from "react";
import getQuestions from "@/lib/api/question/getQuestions";
import QuestionType from "@/types/QuestionType";
import Done from "./Done";
import { PrimaryButton } from "@/components/buttons";
import { redirect } from "next/navigation";
import { getCurrUserInfo } from "@/lib/auth";
import UserType from "@/types/UserType";
import getUsers from "@/lib/api/users/getUsers";

const LeetCodeColabPage = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [qNameQuery, setQNameQuery] = useState("");
  const [queryNotCompleted, setQueryNotCompleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [completed, setCompleted] = useState(0);
  const [userDropdownText, setUserDropdownText] = useState("Posted By");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);

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
      const u_data = await getUsers(isLoggedIn, () => {});

      if (u_data) {
        setUsers(u_data);
      }

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
      <div className="flex items-center justify-between flex-wrap">
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
        <div className="relative mt-5 mb-3">
          <button
            type="button"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {userDropdownText}
            <svg
              className="w-5 h-5 -mr-1 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showUserDropdown && (
            <div
              className="absolute left-0 z-10 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 hover:cursor-pointer"
                  role="menuitem"
                  onClick={() => {
                    setSelectedUser(undefined);
                    setShowUserDropdown(!showUserDropdown);
                    setUserDropdownText("Posted By");
                  }}
                >
                  -
                </a>
                {users.map((user) => {
                  return (
                    <a
                      key={user.id}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 hover:cursor-pointer"
                      role="menuitem"
                      onClick={() => {
                        setSelectedUser(user.id);
                        setShowUserDropdown(!showUserDropdown);
                        setUserDropdownText(user.username);
                      }}
                    >
                      {user.username}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="relative mt-5 mb-3">
            <button
              onClick={() => setQueryNotCompleted(!queryNotCompleted)}
              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <div className="flex items-center h-5">
                <input
                  id="hs-table-search-checkbox-1"
                  type="checkbox"
                  className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                  checked={queryNotCompleted}
                  onChange={() => {}}
                />
                <label className="sr-only">Checkbox</label>
              </div>
              Not Completed
            </button>
          </div>
        )}
        {isLoggedIn && (
          <PrimaryButton type="button" onClick={handleAddQuestion}>
            Add Question
          </PrimaryButton>
        )}
      </div>
      <div className="w-full overflow-x-auto rounded-lg max-w-3/4 md:max-w-screen-lg">
        <table className="min-w-full border divide-y divide-gray-200">
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
    </div>
  );
};

export default LeetCodeColabPage;
