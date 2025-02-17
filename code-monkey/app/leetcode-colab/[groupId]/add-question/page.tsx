"use client";

import QuestionType from "@/types/QuestionType";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect, useRouter, useParams } from "next/navigation";
import { getQuestionByName } from "@/lib/api/question/getQuestion";
import addQuestion from "@/lib/api/question/addQuestion";
import markQuestion from "@/lib/api/question/markQuestion";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";

const AddQuestionPage = () => {
  const params = useParams<{ groupId: string }>();

  const [formData, setFormData] = useState({
    name: "",
    link: "",
    group_id: params.groupId,
  });
  const [changed, setChanged] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [existedQuestion, setExistedQuestion] = useState<QuestionType>();
  const [questionExists, setQuestionExists] = useState(false);
  // const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (!sessionId) {
      redirect("/login");
    }
  }, []);

  const autoFill = (url: string) => {
    const pathSegments = url.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    let targetSegmentIndex = pathSegments.length - 1;

    if (lastSegment[0] === "?") {
      targetSegmentIndex -= 1;
    }

    if (pathSegments[targetSegmentIndex] === "description") {
      targetSegmentIndex -= 1;
    }

    return pathSegments[targetSegmentIndex] || "";
  };

  const checkIfQuestionExists = async (questionName: string) => {
    const existingQuestion = await getQuestionByName(questionName);
    if (existingQuestion.length !== 0) {
      setExistedQuestion(existingQuestion[0]);
      setDisabled(true);
      setQuestionExists(true);
    } else {
      setDisabled(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setQuestionExists(false);
    if (!changed) {
      setChanged(true);
      if (e.target.name == "link") {
        const questionName = autoFill(e.target.value);
        newData = {
          ...newData,
          name: questionName,
        };
        checkIfQuestionExists(questionName);
      }
    } else {
      newData = {
        ...newData,
      };
      setDisabled(false);
    }
    setFormData(newData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const add = async () => {
      addQuestion(() => {
        redirect("/login");
      }, formData);
      router.back();
    };
    add();
  };

  const handleCancel = () => {
    router.back();
  };

  const [checked, setChecked] = useState<boolean>(false);

  const onAuthFail = () => {
    redirect("/login");
  };

  const onMark = (event: ChangeEvent<HTMLInputElement>) => {
    if (existedQuestion) {
      const newChecked = event.target.checked;
      markQuestion(
        {
          done: newChecked,
          q_id: existedQuestion.q_id,
          difficulty: 0,
        },
        onAuthFail,
      );
      setChecked(newChecked);
      handleCancel();
    }
  };

  return (
    <div className="h-[95%] w-full overflow-x-scroll overflow-y-scroll rounded-md bg-cardPrimary p-10 shadow">
      <div className="flex h-full items-center lg:flex-row lg:justify-center">
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Question Link
            </label>
            <input
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Question Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-black"
              required
              placeholder="Two Sum"
            />
          </div>
          <div className="flex justify-center gap-2">
            <PrimaryButton type="submit" disabled={disabled}>
              Add a question
            </PrimaryButton>
            <SecondaryButton type="button" onClick={handleCancel}>
              Cancel
            </SecondaryButton>
          </div>
          {questionExists && (
            <div>
              <div className="mt-2 text-red-400">Question already exists!</div>
              <div className="flex">
                <div className="mt-2 text-red-400">Mark as compeleted?</div>
                <div className="p-1.5">
                  <input
                    id="hs-table-search-checkbox-1"
                    type="checkbox"
                    className="rounded border-gray-200 text-blue-600 focus:ring-blue-500"
                    checked={checked}
                    onChange={onMark}
                  />
                  <label className="sr-only">Checkbox</label>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddQuestionPage;
