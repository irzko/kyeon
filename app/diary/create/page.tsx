"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "@/components/form";
import Link from "next/link";
import Button from "@/components/button";

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
        date: new Date(e.currentTarget.date.value).toISOString(),
        content: e.currentTarget.content.value,
        author: e.currentTarget.author.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      router.push("/diary");
    });
  };
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap justify-between items-center p-2">
          <div className="flex items-center">
            <Link
              href="/diary"
              className="inline-flex items-center p-2 mr-2 text-sm font-medium text-center text-gray-900 bg-white rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
              </svg>
            </Link>

            <span className="font-medium dark:text-white whitespace-nowrap">
              Tạo nhật ký mới
            </span>
          </div>
          <Button form="diary-form" disabled={loading}>
            Lưu
          </Button>
        </div>
      </nav>
      <Form onSubmit={handleSubmit} />
    </>
  );
};

export default Page;
