import request from "../request";

const getSolution = async (s_id: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("s_id", s_id.toString());

  try {
    const json = await request(
      "GET",
      `/solutions/get-solution?${searchParams.toString()}`,
      false
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getSolution;
