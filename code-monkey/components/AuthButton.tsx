"use client";

import { useEffect, useRef, useState } from "react";

interface AuthButtonProps {
  isLoggedIn: boolean;
  username?: string;
}

const AuthButton = ({ isLoggedIn, username }: AuthButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    console.log(isOpen);
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
          className="text-white bg-themeBrown hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {username}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute mt-3 right-0 z-[100] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
            <div className="px-4 py-3 text-sm text-gray-900">
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
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      className="text-white bg-themeBrown hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      Signed In
    </button>
  );
};

export default AuthButton;
