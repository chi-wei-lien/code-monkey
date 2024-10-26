const getMarkQuestions = async () => {
  const url = `${"http://127.0.0.1:8000"}/questions/mark`;

  try {
    const response = await fetch(url);
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

export default getMarkQuestions;
