import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addSolution from "../actions/solution/addSolution";
import ModifySolutionForm from "../types/ModifySolutionForm";
import ModifySolution from "../components/ModifySolution";
import getSolution from "../actions/solution/getSolution";
import Solution from "../types/Solution";
import updateSolution from "../actions/solution/updateSolution";

const DEFAULT_LANG = "Language";

const EditSolutionPage = () => {
  const navigate = useNavigate();
  const { s_id } = useParams();
  const [error, setError] = useState<string | undefined>();
  const [formData, setFormData] = useState<ModifySolutionForm>({
    q_id: -1,
    title: "",
    language: DEFAULT_LANG,
    tc: "",
    sc: "",
    notes: "",
    code: `function add(a, b) {\n  return a + b;\n}`,
  });

  useEffect(() => {
    const load = async () => {
      if (s_id) {
        const solution = (await getSolution(parseInt(s_id))) as Solution;
        setFormData({
          q_id: solution.q_id,
          title: solution.name,
          language: solution.lang_name,
          tc: solution.tc,
          sc: solution.tc,
          notes: solution.notes,
          code: solution.code,
        });
      }
    };
    load();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.language === DEFAULT_LANG) {
      setError("Please select the language of your code");
      return;
    }
    const update = async () => {
      await updateSolution(() => navigate("/login"), {
        s_id: parseInt(s_id ?? "-1"),
        title: formData.title,
        language: formData.language,
        tc: formData.tc,
        sc: formData.sc,
        code: formData.code,
        notes: formData.notes,
      });
      navigate(-1);
    };
    update();
  };

  return (
    <ModifySolution
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      error={error}
      setError={setError}
      buttonText="Edit solution"
      q_id={formData.q_id}
    />
  );
};

export default EditSolutionPage;
