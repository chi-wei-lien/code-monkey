const getHelloWorld = async () => {
    const url = `${'http://127.0.0.1:8000'}/users`;
    console.log(url)

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
}

export default getHelloWorld;
  