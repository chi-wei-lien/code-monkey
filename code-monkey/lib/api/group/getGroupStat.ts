import request from "../request";

export const getGroupStats = async (groupId: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("group_id", groupId.toString());

  try {
    const json = await request(
      "GET",
      `/groups/get-group-stats?${searchParams.toString()}`,
      true,
    );

    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
