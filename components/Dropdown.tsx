"use client";
import DiaryType from "@/types";
import Link from "next/link";
import { useState } from "react";

const Dropdown = ({ diary }: { diary: DiaryType }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    fetch("/api/diary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diary: diary,
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
        className="inline-flex items-center p-2 text-sm font-medium text-center text-[#1D192B] bg-[#E8DEF8] hover:bg-[#1d192b]/[.08] focus:bg-[#1d192b]/[.12] rounded-full focus:outline-none"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
        </svg>
      </button>

      <div
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
      </div>
    </div>
  );
};

export default Dropdown;
