"use client";

import { useCallback, useEffect, useState } from "react";
import getQuestions from "@/lib/api/question/getQuestions";
import QuestionType from "@/types/QuestionType";
import TableRow from "../table-row";
import { PrimaryButton } from "@/components/buttons";
import { redirect, useParams, useRouter } from "next/navigation";
import { getCurrUserInfo } from "@/lib/auth";
import UserType from "@/types/UserType";
import getUsers from "@/lib/api/users/getUsers";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import ColabStatsMenu from "../colab-stats-menu";
import { GroupType } from "@/types/GroupType";
import { getGroup } from "@/lib/api/group/getGroup";
import PostedByButton from "./posted-by-button";
import Image from "next/image";
import { getGroupStats } from "@/lib/api/group/getGroupStat";

const PAGE_SIZE = 10;

const LeetCodeColabPage = () => {
  const params = useParams<{ groupId: string }>();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [qNameQuery, setQNameQuery] = useState("");
  const [queryNotCompleted, setQueryNotCompleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [userDropdownText, setUserDropdownText] = useState("Posted By");
  const [users, setUsers] = useState<UserType[]>([]);

  const [username, setUsername] = useState<string | undefined>();
  const [userId, setUserId] = useState<number | undefined>();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination
  const [lastPostedTime, setLastPostedTime] = useState<Date>(new Date());
  const [firstPostedTime, setFirstPostedTime] = useState<Date>();
  const [lastQuestionId, setLastQuestionId] = useState<number>();
  const [firstQuestionId, setFirstQuestionId] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [group, setGroup] = useState<GroupType>();

  // stats
  const [groupStats, setGroupStats] = useState<StackGraphData[]>();
  const [doneCount, setDoneCount] = useState(0);
  const [qsCount, setQsCount] = useState(0);
  const [notDoneQuestions, setNotDoneQuestions] = useState<QuestionType[]>([]);

  const router = useRouter();

  const resetPagination = () => {
    setLastPostedTime(new Date());
    setFirstPostedTime(undefined);
    setLastQuestionId(undefined);
    setFirstQuestionId(undefined);
    setPageNumber(0);
  };

  const getQuestionsWrapper = useCallback(
    async (
      qNameQuery: string,
      queryNotCompleted: boolean,
      pageSize: number,
      takeLower: boolean,
      firstQuestionId?: number,
      lastQuestionId?: number,
      firstPostedTime?: Date,
      lastPostedTime?: Date,
      userId?: number,
      selectedUser?: number,
    ) => {
      setIsLoading(true);
      const questionData = await getQuestions(
        params.groupId,
        qNameQuery,
        true,
        queryNotCompleted,
        pageSize,
        takeLower,
        firstQuestionId,
        lastQuestionId,
        firstPostedTime,
        lastPostedTime,
        userId,
        selectedUser,
      );
      if (questionData.data) {
        setQuestions(questionData.data);
      }

      if (questionData.first_posted_time) {
        setFirstPostedTime(new Date(questionData.first_posted_time));
      }

      if (questionData.last_posted_time) {
        setLastPostedTime(new Date(questionData.last_posted_time));
      }

      if (questionData.first_q_id) {
        setFirstQuestionId(questionData.first_q_id);
      }

      if (questionData.last_q_id) {
        setLastQuestionId(questionData.last_q_id);
      }

      setIsLoading(false);
      return questionData.data;
    },
    [params.groupId],
  );

  const fetchLeftPageQuestions = async () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
    await getQuestionsWrapper(
      qNameQuery,
      queryNotCompleted,
      PAGE_SIZE,
      true,
      firstQuestionId,
      undefined,
      firstPostedTime,
      undefined,
      userId,
      selectedUser,
    );
  };

  const fetchRightPageQuestions = async () => {
    setPageNumber(pageNumber + 1);
    await getQuestionsWrapper(
      qNameQuery,
      queryNotCompleted,
      PAGE_SIZE,
      false,
      undefined,
      lastQuestionId,
      undefined,
      lastPostedTime,
      userId,
      selectedUser,
    );
  };

  useEffect(() => {
    const onAuthFail = () => {
      redirect("sign-in");
    };
    const { username, userId } = getCurrUserInfo(onAuthFail) || {};
    if (username) {
      setUsername(username);
      setUserId(userId);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    const onLoad = async () => {
      const groupData = await getGroup(parseInt(params.groupId));
      if (groupData) {
        setGroup(groupData);
      }

      const userData = await getUsers(parseInt(params.groupId));
      if (userData) {
        setUsers(userData);
      }

      await getQuestionsWrapper(
        qNameQuery,
        queryNotCompleted,
        PAGE_SIZE,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        userId,
        selectedUser,
      );
    };
    if (hasLoaded) onLoad();
  }, [
    qNameQuery,
    selectedUser,
    queryNotCompleted,
    hasLoaded,
    getQuestionsWrapper,
    params.groupId,
    userId,
  ]);

  const loadStats = useCallback(async () => {
    const statData = await getGroupStats(parseInt(params.groupId));
    setGroupStats(statData.stack_graph_data ?? []);
    setQsCount(statData.question_count ?? 0);
    setDoneCount(statData.completed_count ?? 0);
    setNotDoneQuestions(statData.still_need ?? []);
  }, [params.groupId]);

  useEffect(() => {
    loadStats();
  }, [params.groupId, loadStats]);

  const handleAddQuestion = () => {
    router.push(`/leetcode-colab/${params.groupId}/add-question`);
  };

  return (
    <div className="flex h-full flex-col justify-between gap-5 lg:flex-row">
      <div className="h-fit overflow-y-scroll rounded-md bg-cardPrimary p-10 shadow lg:h-[95%] lg:w-full">
        {group && (
          <h1 className="pb-5 pt-0 text-xl font-bold text-themeBrown">
            {group.name}
          </h1>
        )}
        <div className="flex w-full flex-wrap items-center justify-between"></div>
        <div className="mb-3 flex flex-wrap gap-2">
          <div className="w-76 relative rounded-lg">
            <label className="sr-only">Search</label>
            <input
              type="text"
              className="block w-full rounded-lg border-[1px] border-gray-400 px-3 py-2 ps-9 text-sm text-black shadow-sm"
              placeholder="Search for items"
              value={qNameQuery}
              onChange={(e) => {
                setQNameQuery(e.target.value);
                resetPagination();
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="size-4 text-gray-400"
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
          <PostedByButton
            userDropdownText={userDropdownText}
            users={users}
            onResetClick={() => {
              setSelectedUser(undefined);
              setUserDropdownText("Posted By");
              resetPagination();
            }}
            onClick={(user: UserType) => {
              setSelectedUser(user.id);
              setUserDropdownText(user.username);
              resetPagination();
            }}
          />
          <div className="relative">
            <button
              onClick={() => {
                setQueryNotCompleted(!queryNotCompleted);
                resetPagination();
              }}
              className="inline-flex justify-center gap-x-1.5 rounded-md border-[1px] border-gray-400 bg-white px-3 py-2 text-sm text-themeBrown shadow-sm hover:bg-gray-50"
            >
              <div className="flex h-5 items-center">
                <input
                  id="hs-table-search-checkbox-1"
                  type="checkbox"
                  className="rounded border-gray-200 text-blue-600"
                  checked={queryNotCompleted}
                  onChange={() => {}}
                />
                <label className="sr-only">Checkbox</label>
              </div>
              Not Completed
            </button>
          </div>
          <div>
            <PrimaryButton type="button" onClick={handleAddQuestion}>
              Add Question
            </PrimaryButton>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="relative max-h-[500px] w-fit overflow-y-scroll rounded-lg bg-themeBrown shadow-sm ring-1 ring-gray-300">
            <table className="">
              <thead className="bg-themeBrown">
                <tr>
                  <th
                    scope="col"
                    className="py-3 pl-6 text-start text-xs font-medium uppercase text-white"
                  >
                    Star
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-3 text-start text-xs font-medium uppercase text-white"
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-6 text-start text-xs font-medium uppercase text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-nowrap py-3 text-start text-xs font-medium uppercase text-white"
                  >
                    Posted By
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-6 text-start text-xs font-medium uppercase text-white"
                  >
                    Completed
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-6 text-start text-xs font-medium uppercase text-white"
                  >
                    Solution
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium uppercase text-white"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-cardPrimary">
                {isLoading && (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex w-full items-center justify-center">
                        <Image
                          src={"/gifs/hourglass.gif"}
                          height={80}
                          width={80}
                          alt={`hour glass`}
                          unoptimized={true}
                        />
                      </div>
                    </td>
                  </tr>
                )}
                {questions.map((question) => {
                  return (
                    <TableRow
                      loadStats={loadStats}
                      question={question}
                      myUsername={username}
                      key={question.q_id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex w-full justify-between py-3">
          <button
            onClick={() => {
              fetchLeftPageQuestions();
            }}
          >
            <GoTriangleLeft color="#535151" size={30} />
          </button>
          <div className="rounded-md bg-white px-2 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300">
            {pageNumber}
          </div>
          <button
            onClick={() => {
              fetchRightPageQuestions();
            }}
          >
            <GoTriangleRight color="#535151" size={30} />
          </button>
        </div>
      </div>
      <ColabStatsMenu
        groupStats={groupStats}
        qsCount={qsCount}
        doneCount={doneCount}
        users={users}
        notDoneQuestions={notDoneQuestions}
      />
    </div>
  );
};

export default LeetCodeColabPage;
