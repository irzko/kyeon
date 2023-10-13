import DiaryContainer from "@/components/diary-container";
import Link from "next/link";

import { Style_Script } from "next/font/google";

const stylescript = Style_Script({ subsets: ["vietnamese"], weight: ["400"] });

const getData = async () => {
  return await fetch(`${process.env.BASE_URL}/api/diary`).then((res) =>
    res.json()
  );
};

export default async function Page() {
  const diaries: IDiary[] = await getData();
  return (
    <div>
      <nav className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between p-2 px-4">
          <Link
            href="/diary"
            className={` ${stylescript.className} self-center text-2xl font-black whitespace-nowrap dark:text-white`}
          >
            Nhật ký vũ trụ
          </Link>
          <div className="flex space-x-2">
            <Link
              href="/"
              className="relative text-gray-900 flex justify-center bg-white hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm text-center items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-7 h-7 m-1"
                fill="currentColor"
              >
                <path d="M509.999-492.154v-157.847q0-12.749-8.628-21.374Q492.742-680 479.987-680q-12.756 0-21.371 8.625-8.615 8.625-8.615 21.374v167.078q0 7.063 2.615 13.685 2.615 6.622 8.231 12.238l137 137q8.308 8.307 20.884 8.5 12.577.192 21.269-8.5 8.692-8.692 8.692-21.076 0-12.385-8.692-21.077L509.999-492.154Zm-29.932 392.153q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-480Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
              </svg>
            </Link>
            <Link
              className="relative text-gray-900 flex justify-center bg-white hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm text-center items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
              href="/diary/create"
            >
              <svg
                className="w-7 h-7 m-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M450.001-450.001V-320q0 12.75 8.628 21.374 8.629 8.625 21.384 8.625 12.756 0 21.371-8.625 8.615-8.624 8.615-21.374v-130.001H640q12.75 0 21.375-8.628 8.624-8.629 8.624-21.384 0-12.756-8.624-21.371-8.625-8.615-21.375-8.615H509.999V-640q0-12.75-8.628-21.375-8.629-8.624-21.384-8.624-12.756 0-21.371 8.624-8.615 8.625-8.615 21.375v130.001H320q-12.75 0-21.374 8.628-8.625 8.629-8.625 21.384 0 12.756 8.625 21.371 8.624 8.615 21.374 8.615h130.001Zm30.066 350q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
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
