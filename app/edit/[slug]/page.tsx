"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "@/components/form";
import DiaryType from "@/types";
import LoadingScreen from "@/components/loading-screen";

const Page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [diary, setDiary] = useState<DiaryType>();

  useEffect(() => {
    fetch(`/api/diary?id=${params.slug}`)
      .then(async (res) => res.json())
      .then((data: DiaryType) => {
        setDiary(data);
      });
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/diary", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: diary?.id,
        datetime: e.currentTarget.datetime.value,
        content: e.currentTarget.content.value,
        author: e.currentTarget.author.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        router.back();
      }
    });
  };

  return (
    <>
      <nav className="border-gray-200 bg-gray-50 grid grid-cols-3">
        <div className="flex ml-4 items-center">
          <button onClick={() => router.back()}>
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
          <span className="font-bold whitespace-nowrap">Chỉnh sửa nhật ký</span>
        </div>
      </nav>
      {diary ? (
        <Form diary={diary} onSubmit={handleSubmit} loading={loading} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Page;
