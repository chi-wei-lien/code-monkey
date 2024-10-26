import Cookies from "js-cookie";

const register = async (
  data: { username: string; password: string },
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  const url = `${"http://127.0.0.1:8000"}/users/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await response.json());
    }

    const json = await response.json();

    await Cookies.set("sessionId", json.tokens.access, {
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

export default register;
