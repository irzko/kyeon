import toISOTimeZoneOffset from "@/libs/toISOTimeZoneOffset";
import Link from "next/link";
import prisma from "@/libs/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/submit-button";

export async function generateStaticParams() {
  const diaries: IDiary[] = await fetch(`${process.env.BASE_URL}/api/diary`, {
    // cache: "no-store",
  }).then((res) => res.json());

  return diaries.map((diary) => ({
    diaryId: diary.id,
  }));
}

const getData = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/diary/${id}`, {
    next: {
      tags: ["diary"],
    },
  });
  const data = await res.json();
  return data;
};

const Page = async ({ params }: { params: { diaryId: string } }) => {
  const { diaryId } = params;
  const diary: IDiary = await getData(diaryId);
  const updateAction = async (formData: FormData) => {
    "use server";
    await prisma.diary.update({
      where: { id: diaryId },
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
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap justify-between items-center p-2">
          <div className="flex items-center">
            <Link
              href="/diary"
              className="relative text-gray-900 flex justify-center bg-white hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm text-center items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-7 h-7 m-1"
                fill="currentColor"
              >
                <path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z" />
              </svg>
            </Link>

            <span className="font-medium dark:text-white whitespace-nowrap">
              Chỉnh sửa nhật ký
            </span>
          </div>
        </div>
      </nav>
      <form
        id="diary-form"
        action={updateAction}
        className="p-4 mt-14 max-w-screen-md mx-auto flex flex-col"
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
            defaultValue={diary && toISOTimeZoneOffset(new Date(diary.date))}
            name="date"
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
            rows={10}
            name="content"
            className="bg-gray-50 border-2 text-sm outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Hãy viết gì đó..."
            defaultValue={diary?.content}
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
            defaultValue={diary?.author}
            required
          ></input>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default Page;
