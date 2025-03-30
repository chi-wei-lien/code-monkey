"use client";

import { useEffect, useRef, useState } from "react";

interface EntryPerPageButtonProps {
  dropdownText: string;
  onClick: (pageSize: number) => void;
}

const EntryPerPageButton = ({
  dropdownText,
  onClick,
}: EntryPerPageButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pageSizes = [10, 15, 25, 30, 35];

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
        className="inline-flex items-center rounded-lg border-[1px] border-gray-400 bg-white px-3 py-2 text-center text-sm font-medium text-themeBrown shadow-sm hover:bg-gray-50"
        type="button"
      >
        {dropdownText}
        <svg
          className="ms-3 h-2.5 w-2.5"
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
          className="w-30 z-10 divide-y divide-gray-100 rounded-lg bg-white shadow"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {pageSizes.map((pageSize) => {
              return (
                <a
                  key={pageSize}
                  className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-slate-100"
                  role="menuitem"
                  onClick={() => {
                    onClick(pageSize);
                    setIsOpen(false);
                  }}
                >
                  {pageSize} per page
                </a>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EntryPerPageButton;
