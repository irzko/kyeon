"use client";
import SubmitButton from "@/components/submit-button";
import moment from "moment";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import Input from "@/components/ui/Input";
import ButtonLink from "@/components/ui/ButtonLink";
import { createDiaryAction } from "@/app/action";

const Page = () => {
  return (
    <>
      <Navbar>
        <NavbarContent>
          <NavbarItem className="flex items-center gap-2">
            <ButtonLink color="dark" isIconOnly href="/diary">
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
          <Input
            type="datetime-local"
            id="date"
            name="date"
            className="bg-gray-900 text-base border-none ring-none focus:ring-none focus:border-none hover:outline-none"
            defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
            required
          ></Input>
        </div>
        <div className="mb-6">
          <textarea
            id="content"
            name="content"
            rows={20}
            className="border-none rounded-lg outline-none block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white"
            placeholder="Hãy viết gì đó..."
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <Input
            type="text"
            id="author"
            className="bg-gray-900 text-base border-none ring-none focus:ring-none focus:border-none focus:outline-none"
            name="author"
            placeholder="Người viết"
            required
          ></Input>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default Page;
