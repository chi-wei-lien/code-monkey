import Cookies from "js-cookie";

const getUsers = async () => {
  const url = `${"http://127.0.0.1:8000"}/users/get-users`;
  const sessionId = Cookies.get("sessionId");

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(sessionId && { Authorization: `Bearer ${sessionId}` }),
      },
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

export default getUsers;
