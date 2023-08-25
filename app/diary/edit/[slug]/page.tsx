"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "@/components/form";
import DiaryType from "@/types";

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
        router.push("/diary");
      }
    });
  };

  return (
    <>
      {diary && (
        <Form diary={diary} onSubmit={handleSubmit} loading={loading} />
      )}
    </>
  );
};

export default Page;
