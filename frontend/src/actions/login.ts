import Cookies from "js-cookie";

const login = async (
  data: { username: string; password: string },
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  const url = `${"http://127.0.0.1:8000"}/users/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.detail);
    }

    await Cookies.set("sessionId", json.access, {
      expires: 1,
      secure: false,
      sameSite: "Lax",
    });
    onSuccess();
  } catch (error) {
    if (error instanceof Error) {
      onError(error.message);
      console.error(error.message);
    }
  }
};

export default login;
