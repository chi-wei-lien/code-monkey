const shortenUsername = (username: string) => {
  if (username.length < 8) {
    return username;
  }
  return username.substring(0, 8) + "...";
};

export default shortenUsername;
