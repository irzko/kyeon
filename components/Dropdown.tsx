"use client";
import { useState } from "react";
import ActionModal from "./action-modal";

const Dropdown = ({ diary }: { diary: IDiary }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <ActionModal showModal={open} setShowModal={setOpen} diary={diary} />
    </div>
  );
};

export default Dropdown;
