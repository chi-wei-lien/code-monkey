import Cookies from "js-cookie";

const addQuestion = async (data: { name: string; link: string }) => {
  const url = `${"http://127.0.0.1:8000"}/questions/add-question`;

  const sessionId = Cookies.get("sessionId");

  try {
    const response = await fetch(url, {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionId}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default addQuestion;
