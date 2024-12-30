"use client";

import { pacifico } from "@/app/fonts";
import Link from "next/link";
import { getCurrUserInfo } from "@/lib/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    const { username } = getCurrUserInfo(() => {}) || {};
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
    <nav className="relative md:absolute w-screen flex flex-wrap items-center justify-between pt-2 px-6">
      <Link
        href="/"
        className={`${pacifico.className} text-2xl text-themeBrown`}
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
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="items-center shadow-sm md:shadow-none font-medium flex flex-col border rounded-lg border-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-cardPrimary md:bg-transparent">
          <li>
            <Link
              href="/algo-guide"
              className="block text-gray-900 rounded md:border-0 md:p-0"
            >
              Algo Guide
            </Link>
          </li>
          <li>
            <Link
              href="/leetcode-colab"
              className="block text-gray-900 rounded md:border-0 md:p-0"
            >
              LeetCode Colab
            </Link>
          </li>
          {/* <li>
            <Link
              href="/sign-in"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
            >
              Sign in
            </Link>
          </li> */}
          <li>
            <AuthButton isLoggedIn username={username} />
          </li>
        </ul>
      </div>
    </nav>
  );

  return (
    <div className="w-screen relative">
      <div className="absolute pl-8 pt-3">
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className={`${pacifico.className} text-2xl text-themeBrown`}
          >
            🐵 code monkey
          </Link>
          <div className="pt-2">
            <Link href="/algo-guide" className="text-themeBrown font-bold">
              Algo Guide
            </Link>
          </div>
          <div className="pt-2">
            <Link href="/leetcode-colab" className="text-themeBrown font-bold">
              LeetCode Colab
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute right-0 pr-8 pt-3">
        {isLoggedIn && (
          <div className="pt-2">
            <Link href="/sign-in" className="text-themeBrown font-bold">
              {username}
            </Link>
            <span className="text-themeBrown font-bold">, </span>
            <button
              onClick={handleLogout}
              className="text-themeBrown font-bold"
            >
              log out
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="pt-2">
            <Link href="/sign-in" className="text-themeBrown font-bold">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
