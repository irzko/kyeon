"use client";
import LoadingDots from "@/components/loading-dots";
import DiaryType from "@/types";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState } from "react";

const Form = ({
  diary,
  onSubmit,
  loading,
}: {
  diary?: DiaryType | undefined;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  loading?: boolean;
}) => {
  const router = useRouter();
  return (
      <form className="p-4" onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            htmlFor="datetime"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ngày diễn ra
          </label>
          <input
            type="datetime-local"
            id="datetime"
            // value={diary?.datetime}
            defaultValue={diary?.datetime}
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
            defaultValue={diary?.content}
            required
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
            // value={diary?.author}
            defaultValue={diary?.author}
            required
          ></input>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`${
            loading
              ? "cursor-not-allowed border-gray-200 bg-[#F8E8EE]"
              : "border-black bg-[#7F669D] text-white hover:bg-[#F8E8EE]]"
          } focus:ring-4 focus:outline-none font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center`}
        >
          {loading ? <LoadingDots /> : <p>Lưu</p>}
        </button>
      </form>
  );
};

export default Form;