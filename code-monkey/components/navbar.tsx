"use client";

import Link from "next/link";
import { getCurrUserInfo } from "@/lib/auth";
import { useEffect, useState } from "react";
import AuthButton from "./auth-button";
import { SiInternetcomputer } from "react-icons/si";
import { FaCode } from "react-icons/fa6";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const { username } = getCurrUserInfo(() => {}) || {};
    if (username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setUsername(username);
  }, []);

  return (
    <nav className="relative flex w-screen flex-wrap items-center justify-between bg-cardPrimary px-6 pb-3 pt-3 shadow-sm lg:absolute">
      <Link
        href="/"
        className={`ml-3 text-xl font-semibold text-themeDarkBrown`}
      >
        🐵 code monkey
      </Link>
      <ul className="flex flex-col gap-3 rounded-lg bg-cardPrimary font-medium lg:mt-0 lg:flex-row lg:gap-6">
        <li>
          <Link
            href="/algo-guide"
            className="flex items-center justify-end gap-3 rounded text-themeDarkBrown hover:text-violet-500"
          >
            <FaCode />
            Algo Guide
          </Link>
        </li>
        <li>
          <Link
            href="/leetcode-colab"
            className="flex items-center justify-end gap-3 rounded text-themeDarkBrown hover:text-violet-500"
          >
            <SiInternetcomputer />
            LeetCode Colab
          </Link>
        </li>
        <li>
          <AuthButton isLoggedIn={isLoggedIn} username={username} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
