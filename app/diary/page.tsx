import DiaryContainer from "@/components/diary-container";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";

import { Style_Script } from "next/font/google";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@nextui-org/button";

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
      <Navbar isBordered isBlurred>
        <NavbarContent>
          <NavbarBrand>
            <Link
              href="/diary"
              className={` ${stylescript.className} self-center text-3xl font-black whitespace-nowrap dark:text-white`}
            >
              Nhật ký vũ trụ
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/" isIconOnly variant="flat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} isIconOnly href="/diary/create" variant="flat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="max-w-screen-sm mx-auto p-4">
        <DiaryContainer data={diaries} />
      </main>
    </div>
  );
}
