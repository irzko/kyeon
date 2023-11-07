import toISOTimeZoneOffset from "@/libs/toISOTimeZoneOffset";
import Link from "next/link";
import prisma from "@/libs/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/submit-button";

const Page = () => {
  const createAction = async (formData: FormData) => {
    "use server";
    await prisma.diary.create({
      data: {
        date: new Date(formData.get("date") as string),
        content: formData.get("content") as string,
        author: formData.get("author") as string,
      },
    });
    revalidateTag("diary");
    redirect("/diary");
  };
  return (
    <>
      <nav className="bg-white h-14 items-center flex dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap justify-between items-center p-2">
          <div className="flex items-center">
            <Link
              href="/diary"
              className="relative text-gray-900 flex justify-center focus:outline-none font-medium rounded-full text-sm text-center items-center transition-opacity hover:opacity-80 dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </Link>

            <span className="font-medium dark:text-white whitespace-nowrap">
              Tạo nhật ký mới
            </span>
          </div>
        </div>
      </nav>
      <form
        id="diary-form"
        className="p-4 mt-14 max-w-screen-md mx-auto flex flex-col"
        action={createAction}
      >
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block mb-2 font-medium text-sm text-gray-900 dark:text-white"
          >
            Ngày diễn ra
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            defaultValue={toISOTimeZoneOffset(new Date())}
            className="bg-gray-50 border-2 text-sm outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block mb-2 font-medium text-sm text-gray-900 dark:text-white"
          >
            Nội dung
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            className="bg-gray-50 border-2 text-sm outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Hãy viết gì đó..."
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Người viết
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="bg-gray-50 border-2 text-sm outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Họ tên hoặc nickname"
            required
          ></input>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default Page;
