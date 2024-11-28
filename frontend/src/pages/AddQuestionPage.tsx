import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addQuestion from "../actions/question/addQuestion";
import Cookies from "js-cookie";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { getQuestionByName } from "../actions/question/getQuestion";
import markQuestion from "../actions/question/markQuestion";
import Question from "../types/Question";

const AddQuestionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    link: "",
  });
  const [changed, setChanged] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [existedQuestoin, setExistedQuestion] = useState<Question>();
  const [questionExists, setQuestionExists] = useState(false);
  // const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (!sessionId) {
      navigate("/login");
    }
  }, []);

  const autoFill = (url: string) => {
    const pathSegments = url.split("/").filter(Boolean);
    let lastSegment = pathSegments[pathSegments.length - 1];
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
    if (existingQuestion != null) {
      setExistedQuestion(existingQuestion);
      setDisabled(true);
      setQuestionExists(true);
    } else {
      setDisabled(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        navigate("/login");
      }, formData);
      navigate("/");
    };
    add();
  };

  const handleCancel = () => {
    navigate("/");
  };

  const [checked, setChecked] = useState<boolean>(false);

  const onAuthFail = () => {
    navigate("/login");
  };

  const onMark = (event: ChangeEvent<HTMLInputElement>) => {
    if (existedQuestoin) {
      const newChecked = event.target.checked;
      console.log("yoooo", {
        done: newChecked,
        q_id: existedQuestoin.q_id,
        difficulty: 0,
      });
      markQuestion(
        {
          done: newChecked,
          q_id: existedQuestoin.q_id,
          difficulty: 0,
        },
        onAuthFail
      );
      setChecked(newChecked);
      handleCancel();
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Question Link
          </label>
          <input
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Question Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            placeholder="Two Sum"
          />
        </div>
        <div className="flex gap-2">
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
                  className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
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
  );
};

export default AddQuestionPage;
