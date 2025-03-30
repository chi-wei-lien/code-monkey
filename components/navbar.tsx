"use client";

import Link from "next/link";
import { FaCode } from "react-icons/fa6";

const Navbar = () => {
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
            href="/interview-guide"
            className="flex items-center justify-end gap-3 rounded text-themeDarkBrown hover:text-red-400"
          >
            <FaCode />
            Interview Guide
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
