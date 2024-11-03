import request from "../request";

const updateSolution = async (
  onAuthFail: () => void,
  data: {
    s_id: number;
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
      "/solutions/update-solution",
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

export default updateSolution;
