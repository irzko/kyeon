import Link from "next/link";
import {cache} from 'react'
import prisma from "@/libs/prisma";
import { Style_Script } from "next/font/google";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import NavbarBrand from "@/components/ui/navbar/NavbarBrand";
import DiaryCard from "@/components/diary-card";
import ButtonLink from "@/components/ui/ButtonLink";

const styleScript = Style_Script({ subsets: ["vietnamese"], weight: ["400"] });

const getPosts = cache(
  async () => {
    return await prisma.diary.findMany({ orderBy: { date: "desc" } })
  },
  ['diary'],
  { tags: ['diary'] }
)

export default async function Page() {
  const posts: IDiary[] = await getPosts();
  return (
    <div>
      <Navbar>
        <NavbarContent>
          <NavbarBrand>
            <Link
              href="/"
              className={` ${styleScript.className} self-center text-3xl font-black whitespace-nowrap dark:text-white`}
            >
              Nhật ký vũ trụ
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent>
          <NavbarItem>
            <ButtonLink
              radius="full"
              className="border gap-2 border-gray-300"
              color="light"
              href="/diary/create"
            >
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
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              Viết nhật ký
            </ButtonLink>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="max-w-screen-sm mx-auto p-4">
        <ul className="relative border-l border-gray-200 dark:border-gray-700">
          {posts?.map((post) => (
            <DiaryCard key={post.id} diary={post} />
          ))}
        </ul>
      </main>
    </div>
  );
}
