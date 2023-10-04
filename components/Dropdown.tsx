"use client";
import Link from "next/link";
import { useState } from "react";
import ActionModal from "./action-modal";

const Dropdown = ({ diary }: { diary: IDiary }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    fetch("/api/diary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: diary.id,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-end relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-5 h-5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {/* <div
        className={`z-10 bg-white absolute top-9 mt-2 rounded-xl w-44 shadow ${
          open ? "" : "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700">
          <li>
            <Link href={`/diary/edit/${diary.id}`}>
              <button className="block px-4 text-left font-bold w-full py-2 hover:bg-gray-100">
                Chỉnh sửa nhật ký
              </button>
            </Link>
          </li>
          <li>
            <button
              onClick={handleDelete}
              className="block px-4 text-left w-full font-bold py-2 hover:bg-gray-100"
            >
              Xoá nhật ký
            </button>
          </li>
        </ul>
      </div> */}
      <ActionModal showModal={open} setShowModal={setOpen} diary={diary} />
    </div>
  );
};

export default Dropdown;
