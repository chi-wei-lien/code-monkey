import { useNavigate, useParams } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import {
  PrimaryButton,
  SecondaryButton,
  TagButton,
} from "../components/Buttons";
import { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Solution from "../types/Solution";
import getSolution from "../actions/solution/getSolution";
import Code from "../components/Code";
import ReactMarkdown from "react-markdown";

const SolutionPage = () => {
  const { s_id } = useParams();
  const [solution, setSolution] = useState<Solution>();
  const navigate = useNavigate();
  useEffect(() => {
    const load = async () => {
      if (s_id) {
        const solutionData = await getSolution(parseInt(s_id));
        setSolution(solutionData);
      }
    };
    load();
  }, []);
  return (
    <BaseLayout
      Header={
        <div className="flex items-center justify-between py-3">
          <div className="flex gap-2">
            <SecondaryButton onClick={() => navigate(-1)}>Back</SecondaryButton>
          </div>
          <div className="absolute transform -translate-x-1/2 left-1/2">
            <PrimaryButton
              type="button"
              onClick={() =>
                window.open(solution?.q_link, "_blank", "noopener,noreferrer")
              }
            >
              {solution?.q_name}
            </PrimaryButton>
          </div>
          <Auth />
        </div>
      }
      Content={
        <div>
          <h1 className="mt-4 mb-4 text-4xl text-center bold">
            {solution?.name}
          </h1>
          <div className="mb-4 text-center text-slate-400">
            - by {solution?.posted_by} -
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-3/4">
              <Code code={solution?.code ?? ""} />
              <div className="flex justify-center mt-6">
                <TagButton disabled={true}>
                  Time Complexity: {solution?.tc}
                </TagButton>
                <TagButton disabled={true}>
                  Space Complexity: {solution?.sc}
                </TagButton>
              </div>
              <div className="mt-6">
                <ReactMarkdown>{solution?.notes}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SolutionPage;
