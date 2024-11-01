import request from "./request";

const getSolutions = async (q_id: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("q_id", q_id.toString());

  try {
    const json = await request(
      "GET",
      `/solutions?${searchParams.toString()}`,
      false
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getSolutions;
