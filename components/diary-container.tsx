"use client";

import { useCallback, useMemo, useState } from "react";
import DiaryCard from "./diary-card";
import LoadingScreen from "./loading-screen";
import DiaryContext from "@/context/DiaryContext";

export default function DiaryContainer({ data }: { data: IDiary[] }) {
  const [diaries, setDiaries] = useState<IDiary[]>(data);

  const mutate = useCallback(() => {
    fetch(`/api/diary/`)
      .then((res) => res.json())
      .then((data) => {
        setDiaries(data);
      });
  }, []);

  const contextValue = useMemo(
    () => ({
      diaries,
      mutate,
    }),
    [diaries, mutate]
  );

  return (
    <DiaryContext.Provider value={contextValue}>
      {diaries ? (
        <ul className="relative mt-20 border-l border-gray-200 dark:border-gray-700">
          {diaries?.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </ul>
      ) : (
        <LoadingScreen />
      )}
    </DiaryContext.Provider>
  );
}
