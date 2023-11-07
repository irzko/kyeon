import DiaryContainer from "@/components/diary-container";
import Link from "next/link";

import { Style_Script } from "next/font/google";
import ThemeSwitcher from "@/components/theme-switcher";

const stylescript = Style_Script({ subsets: ["vietnamese"], weight: ["400"] });

const getData = async () => {
  return await fetch(`${process.env.BASE_URL}/api/diary`, {
    next: {
      tags: ["diary"],
    },
  }).then((res) => res.json());
};

export default async function Page() {
  const diaries: IDiary[] = await getData();
  return (
    <div>
      <nav className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between p-4">
          <Link
            href="/diary"
            className={` ${stylescript.className} self-center text-3xl font-black whitespace-nowrap dark:text-white`}
          >
            Nhật ký vũ trụ
          </Link>
          <div className="flex space-x-4">
            <ThemeSwitcher />
            <Link
              href="/"
              className="relative text-gray-900 flex justify-center transition-opacity hover:opacity-80 focus:outline-none font-medium rounded-full text-sm text-center items-center dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
            <Link
              className="relative text-gray-900 flex justify-center transition-opacity hover:opacity-80 focus:outline-none font-medium rounded-full text-sm text-center items-center dark:text-white"
              href="/diary/create"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-screen-sm mx-auto p-4">
        <DiaryContainer data={diaries} />
      </main>
    </div>
  );
}
