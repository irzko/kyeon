"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "@/components/form";
import LoadingScreen from "@/components/loading-screen";
import useSWR, { Fetcher, mutate } from "swr";
import Link from "next/link";
import Button from "@/components/button";

const fetcher: Fetcher<IDiary, string> = (url) =>
  fetch(url).then((res) => res.json());

const Page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: diary } = useSWR(`/api/diary/${params.slug}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
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
        date: new Date(e.currentTarget.date.value).toISOString(),
        content: e.currentTarget.content.value,
        author: e.currentTarget.author.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        mutate("/api/diary");
        router.back();
      }
    });
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap justify-between items-center p-2">
          <div className="flex items-center">
            <Link href="/diary">
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white mr-2"
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
};

export default Page;
