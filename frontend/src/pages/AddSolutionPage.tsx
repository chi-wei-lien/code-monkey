import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addSolution from "../actions/solution/addSolution";
import ModifySolutionForm from "../types/ModifySolutionForm";
import ModifySolution from "../components/ModifySolution";
import { DEFAULT_LANG } from "../constants";

const AddSolutionPage = () => {
  const navigate = useNavigate();
  const { q_id } = useParams();
  const [error, setError] = useState<string | undefined>();
  const [formData, setFormData] = useState<ModifySolutionForm>({
    q_id: parseInt(q_id ?? "-1"),
    title: "",
    language: DEFAULT_LANG,
    tc: "",
    sc: "",
    notes: "",
    code: `function add(a, b) {\n  return a + b;\n}`,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.language === DEFAULT_LANG) {
      setError("Please select the language of your code");
      return;
    }
    const add = async () => {
      await addSolution(() => {
        navigate(`/solutions/${q_id}`);
      }, formData);
      navigate(`/solutions/${q_id}`);
    };
    add();
  };

  return (
    <ModifySolution
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      error={error}
      setError={setError}
      buttonText="Add solution"
      q_id={formData.q_id}
    />
  );
};

export default AddSolutionPage;
