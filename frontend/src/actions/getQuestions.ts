const getQuestions = async (qNameQuery: string) => {
  const url = `${"http://127.0.0.1:8000"}/questions`;

  const searchParams = new URLSearchParams();
  if (qNameQuery !== "") {
    searchParams.append("q_name", qNameQuery);
  }

  try {
    const response = await fetch(`${url}?${searchParams.toString()}`);
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

export default getQuestions;
