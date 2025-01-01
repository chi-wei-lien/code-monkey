"use client";

import logout from "@/lib/api/auth/logout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

interface AuthButtonProps {
  isLoggedIn: boolean;
  username?: string;
}

const AuthButton = ({ isLoggedIn, username }: AuthButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoggedIn) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center justify-end gap-2 text-themeDarkBrown hover:text-violet-500 focus:outline-none">
          <FaRegUserCircle className="mt-1" />
          <button
            onClick={toggleDropdown}
            className="font-medium"
            type="button"
          >
            {username}
          </button>
        </div>
        {isOpen && (
          <div className="absolute right-0 z-[100] mt-5 w-44 divide-y divide-gray-100 rounded-lg bg-white text-sm shadow">
            <div className="px-4 py-3 text-themeDarkBrown">
              <div>Bonnie Green</div>
              <div className="truncate font-medium">name@flowbite.com</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownInformationButton"
            >
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <div className="hover:bg-gray-100">
                <button
                  onClick={() => logout()}
                  className="block px-4 py-2 text-sm text-themeDarkBrown"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      className="inline-flex items-center gap-2 rounded-lg text-center font-medium text-themeDarkBrown focus:outline-none"
      href="/sign-in"
    >
      <FaRegUserCircle />
      Sign In
    </Link>
  );
};

export default AuthButton;
