import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const logout = () => {
  Cookies.remove("sessionId");
  Cookies.remove("refresh");
  redirect("/sign-in");
};

export default logout;
