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
    <nav className="relative lg:absolute w-screen flex flex-wrap items-center justify-between pt-3 px-6 bg-cardPrimary shadow-sm pb-3">
      <Link
        href="/"
        className={`ml-3 text-themeDarkBrown text-xl font-semibold`}
      >
        🐵 code monkey
      </Link>
      <ul className="gap-3 lg:gap-6 font-medium flex flex-col rounded-lg lg:flex-row lg:mt-0 bg-cardPrimary">
        <li>
          <Link
            href="/algo-guide"
            className="flex gap-3 items-center text-themeDarkBrown rounded hover:text-violet-500 justify-end"
          >
            <FaCode />
            Algo Guide
          </Link>
        </li>
        <li>
          <Link
            href="/leetcode-colab"
            className="flex gap-3 items-center text-themeDarkBrown rounded hover:text-violet-500 justify-end"
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
