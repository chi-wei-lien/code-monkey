import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import getQuestion from "../actions/question/getQuestion";
import updateQuestion from "../actions/question/updateQuestion";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";

const EditQuestionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    q_id: -1,
    name: "",
    link: "",
  });
  const { q_id } = useParams();

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (!sessionId) {
      navigate("/login");
    }

    const loadQuestion = async () => {
      const question = await getQuestion(parseInt(q_id ?? "-1"));
      setFormData({
        q_id: question.q_id,
        name: question.name,
        link: question.link,
      });
    };
    loadQuestion();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    if (e.target.name == "link") {
      const regex = /\/([^\/]+)\/$/;
      const match = e.target.value.match(regex);
      const lastPart = match ? match[1] : "";
      newData = {
        ...newData,
        name: lastPart,
      };
    }

    setFormData(newData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const add = async () => {
      updateQuestion(() => {
        navigate("/login");
      }, formData);
      navigate("/");
    };
    add();
  };

  const handleCancel = () => {
    navigate("/");
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
          <PrimaryButton type="submit">Edit question</PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditQuestionPage;
