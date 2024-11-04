import request from "../request";

const getQuestionStatistics = async () => {
  try {
    const json = await request("GET", `/questions/get-statistics`, true);
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getQuestionStatistics;
