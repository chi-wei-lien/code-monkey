import { useEffect, useMemo, useState } from "react";
import getQuestions from "../actions/question/getQuestions";
import Question from "../types/Question";
import User from "../types/User";
import getUsers from "../actions/users/getUsers";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import JwtPayload from "../types/JwtPayload";
import Auth from "../components/Auth";
import Done from "../components/Done";
import BaseLayout from "../components/BaseLayout";
import { PrimaryButton } from "../components/Buttons";
import getQuestionStatistics from "../actions/question/getQuestionStatistics";
import shortenUsername from "../lib/shortenUsername";
import checkLogin from "../lib/checkLogin";

function HomePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [qNameQuery, setQNameQuery] = useState("");
  const navigate = useNavigate();
  const [myId, setMyId] = useState(-1);
  const [completed, setCompleted] = useState(0);
  const [qsCount, setQsCount] = useState(0);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userDropdownText, setUserDropdownText] = useState("Posted By");
  const [queryNotCompleted, setQueryNotCompleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number>();

  const completeness = useMemo(() => {
    if (qsCount === 0) return 0;
    return parseFloat(((completed / qsCount) * 100).toFixed(2));
  }, [completed, qsCount]);

  useEffect(() => {
    const onLoad = async () => {
      const u_data = await getUsers(() => {
        Cookies.remove("sessionId");
        Cookies.remove("refresh");
        window.location.reload();
      });

      if (u_data) {
        setUsers(u_data);
      }

      const q_data = await getQuestions(
        qNameQuery,
        myId,
        queryNotCompleted,
        selectedUser
      );

      if (q_data) {
        setQuestions(q_data);
      }
    };
    onLoad();
  }, [qNameQuery, selectedUser, queryNotCompleted]);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      const payload = jwtDecode<JwtPayload>(sessionId);
      setMyId(parseInt(payload.user_id));
    }
  }, []);

  useEffect(() => {
    const authLoad = async () => {
      if (checkLogin(myId)) {
        const stat = await getQuestionStatistics();
        if (stat) {
          setCompleted(stat.completed_count);
          setQsCount(stat.question_count);
        }
      }
    };
    authLoad();
  }, [myId]);

  const handleAddQuestion = () => {
    navigate("/add-question");
  };

  return (
    <BaseLayout
      Header={
        <div>
          <div className="flex items-center justify-between">
            {checkLogin(myId) && (
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
                  className="block w-full px-3 py-2 text-sm rounded-lg shadow-sm ps-9 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <Auth />
          </div>
          {checkLogin(myId) && (
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-red-400">
                  Completed ({completed}/{qsCount})
                </span>
                <span className="text-sm font-medium text-red-400">
                  {completeness}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 transition ease-in-out">
                <div
                  className="bg-red-400 h-2.5 rounded-full"
                  style={{ width: `${completeness}%` }}
                ></div>
              </div>
            </div>
          )}
          <div className="flex justify-center gap-4">
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
                    fill-rule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
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
            {checkLogin(myId) && (
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
                    />
                    <label className="sr-only">Checkbox</label>
                  </div>
                  Not Completed
                </button>
              </div>
            )}
          </div>
        </div>
      }
      Content={
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-red-400">
            <tr>
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
              {checkLogin(myId) && (
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
                >
                  Completed
                </th>
              )}
              {users &&
                users
                  .filter((user) => user.id !== myId)
                  .map((user) => {
                    return (
                      <th
                        key={user.id}
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-white text-start"
                      >
                        <div className="relative flex justify-center group">
                          <button>{shortenUsername(user.username)}</button>
                          <span className="absolute p-2 text-xs text-white transition-all scale-0 bg-gray-800 rounded top-5 group-hover:scale-100">
                            {user.username}
                          </span>
                        </div>
                      </th>
                    );
                  })}
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
              >
                Solution
              </th>
              {checkLogin(myId) && (
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
            {questions.map((question) => {
              return (
                <Done
                  question={question}
                  users={users}
                  myId={myId}
                  key={question.q_id}
                  completed={completed}
                  setCompleted={setCompleted}
                />
              );
            })}
          </tbody>
        </table>
      }
    />
  );
}

export default HomePage;
