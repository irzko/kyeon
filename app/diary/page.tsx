import DiaryContainer from "@/components/diary-container";
import Link from "next/link";

const getData = async () => {
  return await fetch(`${process.env.BASE_URL}/api/diary`).then((res) =>
    res.json()
  );
};

export default async function Page() {
  const diaries = await getData();
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between p-4">
          <Link
            href="/diary"
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            Nhật ký
          </Link>
          <Link href="/diary/create">
            <button
              type="button"
              className="relative text-gray-900 w-8 h-8 flex justify-center bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm text-center items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 dark:hover:border-gray-600"
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
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
              <span className="sr-only">Cart</span>
            </button>
          </Link>
        </div>
      </nav>
      <main className="max-w-screen-md mx-auto p-4">
        <DiaryContainer data={diaries} />
      </main>
    </div>
  );
}
