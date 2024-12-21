"use client";

import { pacifico } from "@/app/fonts";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/ClientLoader";

const Navbar = () => {
  const { myId, username } = useContext(AuthContext);
  let isLoggedIn = true;

  if (myId == -1) {
    isLoggedIn = false;
  }

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
