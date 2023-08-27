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
        date: e.currentTarget.date.value,
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
      <nav className="border-gray-200 bg-[#F3EDF7] grid grid-cols-3">
        <div className="flex ml-4 items-center">
          <button onClick={() => router.back()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z" />
            </svg>
          </button>
        </div>
        <div className="px-3 py-3 lg:px-5 flex justify-center">
          <span className="font-medium text-[#1D1B20] whitespace-nowrap leading-7">
            Chỉnh sửa nhật ký
          </span>
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
