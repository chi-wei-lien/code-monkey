import Cookies from "js-cookie";

const login = async (data: { username: string; password: string }) => {
  const url = `${"http://127.0.0.1:8000"}/users/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    await Cookies.set("sessionId", json.access, {
      expires: 1,
      secure: false,
      sameSite: "Lax",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default login;
