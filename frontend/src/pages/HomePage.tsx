import { useEffect, useState } from "react";
import getQuestions from "../actions/getQuestions";
import Question from "../types/Question";
import User from "../types/User";
import getUsers from "../actions/getUsers";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import JwtPayload from "../types/JwtPayload";
import Auth from "../components/Auth";

function HomePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [qNameQuery, setQNameQuery] = useState("");
  const navigate = useNavigate();
  const [myId, setMyId] = useState(-1);

  useEffect(() => {
    const onLoad = async () => {
      const q_data = await getQuestions(qNameQuery);
      const u_data = await getUsers();
      setQuestions(q_data);
      setUsers(u_data);
    };
    onLoad();
  }, [qNameQuery]);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      const payload = jwtDecode<JwtPayload>(sessionId);
      setMyId(parseInt(payload.user_id));
    }
  }, []);

  const handleAddQuestion = () => {
    navigate("/add-question");
  };

  return (
    <div>
      <div className="flex flex-col p-10">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border divide-y divide-gray-200 rounded-lg">
              <div className="flex justify-between px-4 py-3">
                <button
                  type="button"
                  className="px-4 py-3 mb-2 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
                  onClick={() => handleAddQuestion()}
                >
                  Add Question
                </button>
                <Auth />
              </div>
              <div className="gap-3 px-4 py-3">
                <div className="relative max-w-xs">
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
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                      >
                        Posted By
                      </th>
                      {myId !== -1 && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          Completed
                        </th>
                      )}

                      {users &&
                        users.map((user) => {
                          return (
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                            >
                              {user.username}
                            </th>
                          );
                        })}
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {questions.map((question) => (
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600 underline whitespace-nowrap underline-offset-2">
                          <a href={question.link} target="_blank">
                            {question.name}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {question.posted_by}
                        </td>
                        {myId !== -1 && (
                          <td className="py-3 ps-4">
                            <div className="flex items-center h-5">
                              <input
                                id="hs-table-search-checkbox-1"
                                type="checkbox"
                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                              />
                              <label className="sr-only">Checkbox</label>
                            </div>
                          </td>
                        )}
                        {users &&
                          users.map((user) => {
                            return (
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {/* {markQuestions[user.username]?.done ? "✅" : ""} */}
                                {question[user.username] ? "✅" : ""}
                              </td>
                            );
                          })}
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Answer
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
