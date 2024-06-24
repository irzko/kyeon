import SubmitButton from "@/components/submit-button";
import moment from "moment";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import Input from "@/components/ui/Input";
import ButtonLink from "@/components/ui/ButtonLink";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";

const Page = () => {
  const createDiaryAction = async (formData: FormData) => {
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
      <Navbar>
        <NavbarContent>
          <NavbarItem className="flex items-center gap-2">
            <ButtonLink color="light" isIconOnly href="/diary">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            </ButtonLink>
          </NavbarItem>
          <NavbarItem>
            <span className="font-semibold">Viết nhật ký</span>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <form
        id="diary-form"
        className="p-4 max-w-screen-md mx-auto flex flex-col"
        action={createDiaryAction}
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
            defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
            required
          ></Input>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <Input
            type="text"
            id="author"
            name="author"
            placeholder="Họ tên hoặc nickname"
            required
          ></Input>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default Page;
