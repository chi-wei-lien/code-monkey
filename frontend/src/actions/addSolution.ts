import request from "./request";

const addSolution = async (
  onAuthFail: () => void,
  data: {
    q_id: number;
    title: string;
    language: string;
    tc: string;
    sc: string;
    code: string;
    notes: string;
  }
) => {
  try {
    return await request(
      "POST",
      "/solutions/add-solution",
      true,
      onAuthFail,
      undefined,
      data
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default addSolution;
