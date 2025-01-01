"use client";

import Link from "next/link";
import { getCurrUserInfo } from "@/lib/auth";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
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
    <nav className="relative md:absolute w-screen flex flex-wrap items-center justify-between pt-3 px-6 bg-cardPrimary shadow-sm pb-3">
      <Link
        href="/"
        className={`ml-3 text-themeDarkBrown text-xl font-semibold`}
      >
        🐵 code monkey
      </Link>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      <ul className="items-center gap-2 shadow-sm md:shadow-none font-medium flex flex-col border rounded-lg border-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-cardPrimary md:bg-transparent">
        <li>
          <Link
            href="/algo-guide"
            className="flex gap-3 items-center text-themeDarkBrown rounded hover:text-violet-500"
          >
            <FaCode />
            Algo Guide
          </Link>
        </li>
        <li>
          <Link
            href="/leetcode-colab"
            className="flex gap-3 items-center text-themeDarkBrown rounded hover:text-violet-500"
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
