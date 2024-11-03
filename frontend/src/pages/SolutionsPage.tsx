import { useEffect, useState } from "react";
import User from "../types/User";
import getUsers from "../actions/users/getUsers";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import JwtPayload from "../types/JwtPayload";
import Auth from "../components/Auth";
import getSolutions from "../actions/solution/getSolutions";
import Solution from "../types/Solution";
import deleteSolution from "../actions/solution/deleteSolution";
import Question from "../types/Question";
import getQuestion from "../actions/question/getQuestion";
import BaseLayout from "../components/BaseLayout";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";

function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [myId, setMyId] = useState(-1);

  const { q_id } = useParams();

  useEffect(() => {
    const onLoad = async () => {
      if (q_id) {
        const s_data = await getSolutions(parseInt(q_id));
        const q_data = await getQuestion(parseInt(q_id));
        const u_data = await getUsers(() => {
          navigate("/login");
        });
        setSolutions(s_data);
        setUsers(u_data);
        setQuestion(q_data);
      }
    };
    onLoad();
  }, []);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      const payload = jwtDecode<JwtPayload>(sessionId);
      setMyId(parseInt(payload.user_id));
    }
  }, []);

  const handleAddSolution = () => {
    navigate(`/add-solution/${q_id}`);
  };

  const onDelete = async (solution: Solution) => {
    if (
      window.confirm(
        `Are you sure you want to remove this solution: ${solution.name}?`
      )
    ) {
      await deleteSolution(solution.s_id);
      window.location.reload();
    }
  };

  return (
    <BaseLayout
      Header={
        <div className="flex items-center justify-between py-3">
          <div className="flex gap-2">
            {myId !== -1 && (
              <PrimaryButton type="button" onClick={handleAddSolution}>
                Add Solution
              </PrimaryButton>
            )}
            <SecondaryButton onClick={() => navigate(-1)}>Back</SecondaryButton>
          </div>
          <div className="absolute transform -translate-x-1/2 left-1/2">
            <PrimaryButton
              type="button"
              onClick={() =>
                window.open(question?.link, "_blank", "noopener,noreferrer")
              }
            >
              {question?.name}
            </PrimaryButton>
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
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-white uppercase text-end"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {solutions.map((solution) => {
              return (
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600 underline whitespace-nowrap underline-offset-2">
                    <a href={`/solution/${solution.s_id}`}>{solution.name}</a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {solution.posted_by}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                    <div className="relative inline-block group">
                      <button className="flex items-center w-10 h-10 px-2 py-1 bg-white rounded-sm outline-none focus:outline-none">
                        <span className="flex-1 pr-1">
                          <svg
                            fill="none"
                            height="20"
                            viewBox="0 0 20 20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 10C6 11.1046 5.10457 12 4 12C2.89543 12 2 11.1046 2 10C2 8.89543 2.89543 8 4 8C5.10457 8 6 8.89543 6 10Z"
                              fill="#4A5568"
                            />
                            <path
                              d="M12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z"
                              fill="#4A5568"
                            />
                            <path
                              d="M16 12C17.1046 12 18 11.1046 18 10C18 8.89543 17.1046 8 16 8C14.8954 8 14 8.89543 14 10C14 11.1046 14.8954 12 16 12Z"
                              fill="#4A5568"
                            />
                          </svg>
                        </span>
                      </button>
                      {myId === solution.posted_by_id && (
                        <ul className="absolute right-0 z-50 transition duration-150 ease-in-out origin-top transform scale-0 bg-white border rounded-sm group-hover:scale-100 min-w-32">
                          <>
                            <a
                              className="hover:cursor-pointer"
                              onClick={() => {
                                navigate(`/edit-solution/${solution.s_id}`);
                              }}
                            >
                              <li className="px-3 py-1 rounded-sm hover:bg-gray-100">
                                Edit
                              </li>
                            </a>
                            <a onClick={() => onDelete(solution)}>
                              <li className="px-3 py-1 rounded-sm hover:bg-gray-100">
                                Delete
                              </li>
                            </a>
                          </>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    />
  );
}

export default SolutionsPage;
