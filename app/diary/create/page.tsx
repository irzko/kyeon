"use client";
import LoadingDots from "@/components/loading-dots";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="border-gray-200 bg-gray-50 grid grid-cols-3">
        <div className="flex ml-4 items-center">
          <button onClick={() => router.push("/diary")}>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </div>
        <div className="px-3 py-3 lg:px-5 flex justify-center">
          <span className="font-semibold whitespace-nowrap">Tạo nhật ký</span>
        </div>
      </nav>
      <form
        className="p-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          fetch("/api/diary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: e.currentTarget.date.value,
              content: e.currentTarget.content.value,
              author: e.currentTarget.author.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              router.push("/diary");
            }
          });
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ngày diễn ra
          </label>
          <input
            type="datetime-local"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nội dung
          </label>
          <textarea
            id="content"
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Hãy viết gì đó..."
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Người viết
          </label>
          <input
            type="text"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Họ tên hoặc nickname"
            required
          ></input>
        </div>

        <button
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border-black bg-[#7F669D] text-white hover:bg-[#F8E8EE]]"
          } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center`}
        >
          {loading ? <LoadingDots /> : <p>Đăng</p>}
        </button>
      </form>
    </>
  );
};

export default Page;
