"use client";

import UserType from "@/types/UserType";
import { useEffect, useRef, useState } from "react";

interface PostedByButtonProps {
  userDropdownText: string;
  onResetClick: () => void;
  onClick: (user: UserType) => void;
  users: UserType[];
}

const PostedByButton = ({
  onResetClick,
  userDropdownText,
  onClick,
  users,
}: PostedByButtonProps) => {
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

  return (
    <div ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-themeBrown shadow-sm bg-white hover:bg-gray-50 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center border-[1px]  border-gray-400"
        type="button"
      >
        {userDropdownText}
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
        <div
          id="dropdown"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 hover:cursor-pointer"
              role="menuitem"
              onClick={() => {
                onResetClick();
                setIsOpen(false);
              }}
            >
              -
            </a>
            {users.map((user) => {
              return (
                <a
                  key={user.id}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 hover:cursor-pointer"
                  role="menuitem"
                  onClick={() => {
                    onClick(user);
                    setIsOpen(false);
                  }}
                >
                  {user.username}
                </a>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostedByButton;
