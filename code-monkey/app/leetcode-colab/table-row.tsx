"use client";

import { ChangeEvent, useEffect, useState } from "react";
import QuestionType from "@/types/QuestionType";
import { redirect } from "next/navigation";
import markQuestion from "@/lib/api/question/markQuestion";
import deleteQuestion from "@/lib/api/question/deleteQuestion";
import { BsThreeDots } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import likeQuestion from "@/lib/api/question/likeQuestion";

interface TableRowProps {
  question: QuestionType;
  completed: number;
  setCompleted: React.Dispatch<React.SetStateAction<number>>;
  myUsername?: string;
}

const TableRow = ({
  question,
  setCompleted,
  completed,
  myUsername,
}: TableRowProps) => {
  const [checked, setChecked] = useState<boolean>(question.is_completed);
  const [isLiked, setIsLiked] = useState<boolean>(question.is_liked);
  const [likes, setLikes] = useState<number>(question.likes);

  useEffect(() => {
    setChecked(question.is_completed);
  }, [question]);

  const onAuthFail = () => {
    redirect("/login");
  };

  const onDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove this question: ${question.name}?`,
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
      onAuthFail,
    );
    setChecked(newChecked);
    if (!newChecked) {
      setCompleted(completed - 1);
    } else {
      setCompleted(completed + 1);
    }
  };

  const handleStarClick = () => {
    const newLike = !isLiked;
    likeQuestion({ q_id: question.q_id, like: newLike }, onAuthFail);
    setIsLiked(newLike);
    if (newLike) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };

  return (
    <tr>
      <td className="flex items-center gap-2 whitespace-nowrap px-6 py-3 text-sm text-gray-800">
        {isLiked ? (
          <FaStar
            className="text-xl text-amber-400"
            onClick={handleStarClick}
          />
        ) : (
          <FaRegStar className="text-xl" onClick={handleStarClick} />
        )}
        {likes}
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-800">
        {question.number}
      </td>
      <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-blue-600 underline underline-offset-2">
        <a className="block w-48" href={question.link} target="_blank">
          <div className="group relative flex justify-start">
            <button className="overflow-hidden text-ellipsis whitespace-nowrap">
              {question.name}
            </button>
            <span className="absolute top-5 scale-0 rounded bg-gray-800 p-2 text-xs text-white transition-all group-hover:scale-100">
              {question.name}
            </span>
          </div>
        </a>
      </td>
      <td className="whitespace-nowrap py-3 text-sm text-gray-800">
        <div className="w-14">
          <div className="justify-left group relative flex">
            <button className="overflow-hidden text-ellipsis whitespace-nowrap">
              {question.posted_by}
            </button>
            <span className="absolute top-5 scale-0 rounded bg-gray-800 p-2 text-xs text-white transition-all group-hover:scale-100">
              {question.posted_by}
            </span>
          </div>
        </div>
      </td>
      <td className="py-3 pl-6">
        <div className="flex h-5 items-center justify-center">
          <input
            id="hs-table-search-checkbox-1"
            type="checkbox"
            className="rounded border-gray-200 text-blue-600 focus:ring-blue-500"
            checked={checked}
            onChange={onMark}
          />
          <label className="sr-only">Checkbox</label>
        </div>
      </td>
      <td className="whitespace-nowrap py-3 pl-6 text-sm text-blue-600 underline underline-offset-2">
        <a
          className="hover:cursor-pointer"
          onClick={() => redirect(`/question/${question.q_id}/solutions`)}
        >
          Solutions
        </a>
      </td>
      <td className="whitespace-nowrap px-6 py-3 text-center text-sm">
        <div className="group relative inline-block">
          <BsThreeDots color="black" />

          <ul className="absolute right-0 z-50 min-w-32 origin-top scale-0 transform rounded-sm border bg-white transition duration-150 ease-in-out group-hover:scale-100">
            <a
              className="hover:cursor-pointer"
              href={`/add-solution/${question.q_id}`}
            >
              <li className="rounded-sm px-1 py-1 text-black hover:bg-gray-100">
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
                  <li className="rounded-sm px-1 py-1 text-black hover:bg-gray-100">
                    Edit
                  </li>
                </a>
                <a onClick={onDelete}>
                  <li className="rounded-sm px-1 py-1 text-red-500 hover:bg-gray-100">
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
