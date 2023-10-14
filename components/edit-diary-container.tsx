"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "@/components/form";
import LoadingScreen from "@/components/loading-screen";
import Link from "next/link";
import Button from "@/components/button";

export default function EditDiaryContainer({ diary }: { diary: IDiary }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/diary", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: diary.id,
        date: new Date(e.currentTarget.date.value).toISOString(),
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
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap justify-between items-center p-2">
          <div className="flex items-center">
            <Link
              href="/diary"
              className="relative text-gray-900 flex justify-center bg-white hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm text-center items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-7 h-7 m-1"
                fill="currentColor"
              >
                <path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z" />
              </svg>
            </Link>

            <span className="font-medium dark:text-white whitespace-nowrap">
              Chỉnh sửa nhật ký
            </span>
          </div>
          <Button form="diary-form" disabled={loading}>
            Lưu
          </Button>
        </div>
      </nav>
      {diary ? (
        <Form diary={diary} onSubmit={handleSubmit} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
