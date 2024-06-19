import prisma from "@/libs/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/submit-button";
import moment from "moment";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import ButtonLink from "@/components/ui/ButtonLink";
import Input from "@/components/ui/Input";

export async function generateStaticParams() {
  const diaries: IDiary[] = await fetch(`${process.env.BASE_URL}/api/diary`, {
    next: {
      tags: ["diary"],
    },
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
      <Navbar>
        <NavbarContent>
          <NavbarItem>
            <ButtonLink color="light" isIconOnly href="/diary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </ButtonLink>
          </NavbarItem>
          <NavbarItem>
            <span className="font-semibold">Sửa nhật ký</span>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <form
        id="diary-form"
        action={updateAction}
        className="p-4 max-w-screen-md mx-auto flex flex-col"
      >
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block mb-2 font-medium text-sm text-gray-900 dark:text-white"
          >
            Ngày diễn ra
          </label>
          <Input
            type="datetime-local"
            id="date"
            name="date"
            defaultValue={
              diary && moment(diary.date).format("YYYY-MM-DDTHH:mm")
            }
            required
          />
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <Input
            type="text"
            id="author"
            name="author"
            placeholder="Họ tên hoặc nickname"
            defaultValue={diary?.author}
            required
          ></Input>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default Page;
