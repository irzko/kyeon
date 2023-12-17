"use client";
import Link from "next/link";
import SubmitButton from "@/components/submit-button";
import { createDiary } from "@/app/action";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import moment from "moment";

const Page = () => {
  return (
    <>
      <Navbar isBordered isBlurred>
        <NavbarContent>
          <NavbarItem>
            <Button
              isIconOnly
              as={Link}
              href="/diary"
              variant="flat"
              startContent={
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
              }
            ></Button>
          </NavbarItem>
          <NavbarItem>Tạo nhật ký mới</NavbarItem>
        </NavbarContent>
      </Navbar>

      <form
        id="diary-form"
        className="p-4 max-w-screen-md mx-auto flex flex-col"
        action={createDiary}
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
            defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
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
