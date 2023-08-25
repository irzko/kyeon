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
      <Form onSubmit={handleSubmit} loading={loading} />
    </>
  );
};

export default Page;
