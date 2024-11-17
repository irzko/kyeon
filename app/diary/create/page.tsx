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
            <ButtonLink color="dark" className="bg-transparent" isIconOnly href="/diary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
                <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ButtonLink>
          </NavbarItem>
          <NavbarItem>
            <h6 className="font-semibold">Nhật ký mới</h6>
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
            defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
            required
          ></Input>
        </div>
        <div className="mb-6">
          <textarea
            id="content"
            name="content"
            rows={15}
            className="border text-sm rounded-lg outline-none focus:ring-1 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Hãy viết gì đó..."
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <Input
            type="text"
            id="author"
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
