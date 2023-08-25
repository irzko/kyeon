import Diary from "@/components/diary";
import getApiUrl from "@/libs/api-url";
import DiaryType from "@/types";
import Link from "next/link";

async function getDiaries() {
  const res = await fetch(`${getApiUrl()}/api/diary/`, { cache: "no-store" });
  return res.json();
}

export default async function Page() {
  const diaries = await getDiaries();

  return (
    <div>
      <main className="p-4">
        <div className="fixed z-50 w-auto bg-white shadow-xl bottom-4 right-4 rounded-full">
          <Link
            href="/diary/create"
            type="button"
            className="flex items-center h-full"
          >
            <button
              type="button"
              className="inline-flex items-center justify-center w-14 h-14 font-medium bg-[#7F669D] rounded-full hover:bg-[##F8E8EE] group focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </Link>
        </div>

        <ol className="relative border-l border-[#7F669D]">
          {diaries.map((diary: DiaryType) => (
            <Diary key={diary.id} diary={diary} />
          ))}
        </ol>
      </main>
    </div>
  );
}
