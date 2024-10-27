import Cookies from "js-cookie";

const markQuestion = async (data: {
  q_id: number;
  done: boolean;
  difficulty: number;
}) => {
  const url = `${"http://127.0.0.1:8000"}/questions/mark-question`;

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

export default markQuestion;
