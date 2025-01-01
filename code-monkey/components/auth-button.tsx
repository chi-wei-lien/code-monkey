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
        <button
          onClick={toggleDropdown}
          className="text-themeDarkBrown focus:outline-none font-medium rounded-lg text-center inline-flex items-center gap-2 hover:text-violet-500 pr-2"
          type="button"
        >
          <FaRegUserCircle />
          {username}
        </button>
        {isOpen && (
          <div className="absolute mt-5 right-0 z-[100] bg-white divide-y text-sm divide-gray-100 rounded-lg shadow w-44">
            <div className="px-4 py-3 text-themeDarkBrown">
              <div>Bonnie Green</div>
              <div className="font-medium truncate">name@flowbite.com</div>
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
      className="text-themeDarkBrown focus:outline-none font-medium rounded-lg text-center inline-flex items-center gap-2"
      href="/sign-in"
    >
      <FaRegUserCircle />
      Sign In
    </Link>
  );
};

export default AuthButton;
