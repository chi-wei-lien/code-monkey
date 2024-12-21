"use client";
import { createContext } from "react";
import AuthContextType from "@/types/AuthContextType";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import JwtPayload from "@/types/JwtPayload";

export const AuthContext = createContext<AuthContextType>({
  myId: -1,
  username: "",
  reloadSignal: 0,
  setReloadSignal: () => {},
});

export default function ClientLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myId, setMyId] = useState(-1);
  const [username, setUsername] = useState("");
  const [reloadSignal, setReloadSignal] = useState(0);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      const payload = jwtDecode<JwtPayload>(sessionId);
      setMyId(parseInt(payload.user_id));
      setUsername(payload.username);
    }
  }, [reloadSignal]);

  return (
    <AuthContext.Provider
      value={{ myId, username, reloadSignal, setReloadSignal }}
    >
      {children}
    </AuthContext.Provider>
  );
}
