import { ChangeEvent, useState } from "react";
import Question from "../types/Question";
import markQuestion from "../actions/markQuestion";
import User from "../types/User";

interface DoneProps {
  question: Question;
  myId: number;
  users: User[];
}

const Done = ({ question, myId, users }: DoneProps) => {
  const [checked, setChecked] = useState<boolean>(
    question[myId.toString()] as boolean
  );
  return (
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
              checked={checked}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newChecked = event.target.checked;
                markQuestion({
                  done: newChecked,
                  q_id: question.q_id,
                  difficulty: 0,
                });
                setChecked(newChecked);
              }}
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
              {question[user.id] ? "✅" : ""}
            </td>
          );
        })}
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        Solution
      </td>
      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
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
  );
};

export default Done;
