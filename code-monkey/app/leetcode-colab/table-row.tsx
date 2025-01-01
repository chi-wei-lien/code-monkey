"use client";

import { ChangeEvent, useEffect, useState } from "react";
import QuestionType from "@/types/QuestionType";
import { redirect } from "next/navigation";
import markQuestion from "@/lib/api/question/markQuestion";
import deleteQuestion from "@/lib/api/question/deleteQuestion";
import { BsThreeDots } from "react-icons/bs";

interface TableRowProps {
  number: number;
  question: QuestionType;
  completed: number;
  setCompleted: React.Dispatch<React.SetStateAction<number>>;
  myUsername?: string;
}

const TableRow = ({
  question,
  number,
  setCompleted,
  completed,
  myUsername,
}: TableRowProps) => {
  const [checked, setChecked] = useState<boolean>(question.is_completed);

  useEffect(() => {
    setChecked(question.is_completed);
  }, [question]);

  const onAuthFail = () => {
    redirect("/login");
  };
  const onDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove this question: ${question.name}?`
      )
    ) {
      await deleteQuestion(question.q_id);
      window.location.reload();
    }
  };

  const onMark = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    markQuestion(
      {
        done: newChecked,
        q_id: question.q_id,
        difficulty: 0,
      },
      onAuthFail
    );
    setChecked(newChecked);
    if (!newChecked) {
      setCompleted(completed - 1);
    } else {
      setCompleted(completed + 1);
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {number}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-blue-600 underline whitespace-nowrap underline-offset-2">
        <a className="block w-48" href={question.link} target="_blank">
          <div className="relative flex justify-start group">
            <button className="overflow-hidden text-ellipsis whitespace-nowrap">
              {question.name}
            </button>
            <span className="absolute p-2 text-xs text-white transition-all scale-0 bg-gray-800 rounded top-5 group-hover:scale-100">
              {question.name}
            </span>
          </div>
        </a>
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        <div className="w-20">
          <div className="relative flex justify-left group">
            {/* <button>{shortenUsername(question.posted_by)}</button> */}
            <button className="overflow-hidden text-ellipsis whitespace-nowrap">
              {question.posted_by}
            </button>
            <span className="absolute p-2 text-xs text-white transition-all scale-0 bg-gray-800 rounded top-5 group-hover:scale-100">
              {question.posted_by}
            </span>
          </div>
        </div>
      </td>
      <td className="py-3">
        <div className="flex justify-center items-center h-5">
          <input
            id="hs-table-search-checkbox-1"
            type="checkbox"
            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
            checked={checked}
            onChange={onMark}
          />
          <label className="sr-only">Checkbox</label>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-blue-600 underline whitespace-nowrap underline-offset-2">
        <a
          className="hover:cursor-pointer"
          onClick={() => redirect(`/question/${question.q_id}/solutions`)}
        >
          Solutions
        </a>
      </td>
      <td className="px-6 py-4 text-sm whitespace-nowrap text-end">
        <div className="relative inline-block group">
          <BsThreeDots color="black" />

          <ul className="absolute right-0 z-50 transition duration-150 ease-in-out origin-top transform scale-0 bg-white border rounded-sm group-hover:scale-100 min-w-32">
            <a
              className="hover:cursor-pointer"
              href={`/add-solution/${question.q_id}`}
            >
              <li className="px-3 py-1 rounded-sm hover:bg-gray-100 text-black">
                Add Solution
              </li>
            </a>

            {myUsername === question.posted_by && (
              <>
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    redirect(`/edit-question/${question.q_id}`);
                  }}
                >
                  <li className="px-3 py-1 rounded-sm hover:bg-gray-100 text-black">
                    Edit
                  </li>
                </a>
                <a onClick={() => onDelete()}>
                  <li className="px-3 py-1 rounded-sm text-red-500 hover:bg-gray-100">
                    Delete
                  </li>
                </a>
              </>
            )}
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
