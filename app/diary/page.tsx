import getApiUrl from "@/libs/api-url";
import DiaryType from "@/types";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";

async function getDiaries(): Promise<DiaryType[]> {
  const res = await fetch(`${getApiUrl()}/api/diary/`, { cache: "no-store" });
  return res.json();
}


const Diary = ({ diary }: { diary: DiaryType }) => {
  return (
    <li className="mb-4 ml-4">
      <div className="absolute w-3 h-3 bg-[#7F669D] rounded-full mt-4 -left-1.5 border border-white"></div>
      <div className="relative px-2 py-2 bg-white rounded-3xl">
        <div className="flex justify-between">
          <time className="mb-1 text-sm leading-none font-bold text-[#7F669D] bg-[#F8E8EE] rounded-full px-2 flex items-center">
            {new Date(diary.datetime).toLocaleString()}
          </time>
          <Dropdown diary={diary} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {diary.content}
          </h3>
          <p className="text-base font-normal italic text-gray-500 text-right">
            {diary.author}
          </p>
        </div>
      </div>
    </li>
  );
};

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
