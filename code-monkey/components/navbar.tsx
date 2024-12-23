"use client";

import { pacifico } from "@/app/fonts";
import Link from "next/link";
import { getCurrUserInfo } from "@/lib/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
    const { username } = getCurrUserInfo() || {};
    if (username) {
      setIsLoggedIn(true);
      setUsername(username);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("sessionId");
    Cookies.remove("refresh");
    window.location.reload();
  };

  return (
    <div className="w-screen relative">
      <div className="absolute pl-8 pt-3">
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className={`${pacifico.className} text-2xl text-fontLogo`}
          >
            🐵 code monkey
          </Link>
          <div className="pt-2">
            <Link href="/algo-guide" className="text-fontLogo font-bold">
              Algo Guide
            </Link>
          </div>
          <div className="pt-2">
            <Link href="/leetcode-colab" className="text-fontLogo font-bold">
              LeetCode Colab
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute right-0 pr-8 pt-3">
        {isLoggedIn && (
          <div className="pt-2">
            <Link href="/sign-in" className="text-fontLogo font-bold">
              {username}
            </Link>
            <span className="text-fontLogo font-bold">, </span>
            <button onClick={handleLogout} className="text-fontLogo font-bold">
              log out
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="pt-2">
            <Link href="/sign-in" className="text-fontLogo font-bold">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
