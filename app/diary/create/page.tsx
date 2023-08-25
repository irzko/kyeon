"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "@/components/form";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datetime: e.currentTarget.datetime.value,
        content: e.currentTarget.content.value,
        author: e.currentTarget.author.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        router.push("/diary");
      }
    });
  };
  return (
    <>
      <nav className="border-gray-200 bg-gray-50 grid grid-cols-3">
        <div className="flex ml-4 items-center">
          <button onClick={() => router.replace("/diary")}>
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
          <span className="font-bold whitespace-nowrap">Tạo nhật ký mới</span>
        </div>
      </nav>
      <Form onSubmit={handleSubmit} loading={loading} />
    </>
  );
};

export default Page;
