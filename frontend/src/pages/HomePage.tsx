import { useEffect, useState } from "react";
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

function HomePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [qNameQuery, setQNameQuery] = useState("");
  const navigate = useNavigate();
  const [myId, setMyId] = useState(-1);

  useEffect(() => {
    const onLoad = async () => {
      const q_data = await getQuestions(qNameQuery);
      const u_data = await getUsers(() => {
        Cookies.remove("sessionId");
      });
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
    <BaseLayout
      Header={
        <div className="flex items-center justify-between">
          {myId !== -1 && (
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
                className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
              >
                Posted By
              </th>
              {myId !== -1 && (
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
                >
                  Completed
                </th>
              )}
              {users &&
                users.map((user) => {
                  return (
                    <th
                      key={user.id}
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
                    >
                      {user.username}
                    </th>
                  );
                })}
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-white uppercase text-start"
              >
                Solution
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-white uppercase text-end"
              >
                Action
              </th>
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
