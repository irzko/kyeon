"use client";

import Diary from "@/components/diary";
import DiaryType from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [diaries, setDiaries] = useState<DiaryType[]>([]);

  useEffect(() => {
    fetch("/api/diary")
      .then(async (res) => res.json())
      .then((data: DiaryType[]) => {
        data.sort((postA: DiaryType, postB: DiaryType) => {
          const dateA = new Date(postA.date);
          const dateB = new Date(postB.date);
          return dateB.getTime() - dateA.getTime();
        });
        setDiaries(data);
      });
  }, []);

  return (
    <div>
      <main className="p-4">
        <h1 className="text-[28px] font-medium text-[#1D1B20] leading-9 my-10">
          Nhật ký
        </h1>
        <div className="fixed z-50 w-auto bottom-4 right-4 bg-[#EADDFF] rounded-2xl">
          <Link
            href="/diary/create"
            type="button"
            className="flex items-center h-full"
          >
            <button
              type="button"
              className="inline-flex items-center justify-center w-14 h-14 shadow-button rounded-2xl font-medium hover:bg-[#21005d]/[.08] focus::bg-[#21005d]/[.12] group focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#21005D]"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
              </svg>
            </button>
          </Link>
        </div>

        <ol className="relative border-l border-[#6750A4]">
          {diaries.map((diary: DiaryType) => (
            <Diary key={diary.id} diary={diary} />
          ))}
        </ol>
      </main>
    </div>
  );
}
