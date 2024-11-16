import Link from "next/link";
import { unstable_cache } from 'next/cache';
import prisma from "@/libs/prisma";
import { Style_Script } from "next/font/google";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import NavbarBrand from "@/components/ui/navbar/NavbarBrand";
import Post from "@/components/diary/post";
import ButtonLink from "@/components/ui/ButtonLink";

const styleScript = Style_Script({ subsets: ["vietnamese"], weight: ["400"] });

const getPosts = unstable_cache(
  async () => {
    return await prisma.diary.findMany({ orderBy: { date: "desc" } })
  },
  ['diary'],
  { tags: ['diary'] }
)

export default async function Page() {
  const posts: IDiary[] = await getPosts();
  return (
    <div className="graph-paper">
      <Navbar>
        <NavbarContent>
          <NavbarBrand>
            <Link
              href="/"
              className={` ${styleScript.className} self-center text-3xl font-black whitespace-nowrap text-white`}
            >
              #nhatkyvutru
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent>
          <NavbarItem>
            <ButtonLink
              radius="full"
              className="gap-2 font-bold"
              color="default"
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
              Tạo
            </ButtonLink>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="max-w-screen-sm mx-auto p-4">
        <ul className="list-none space-y-4">
          {posts?.map((post) => (
            <Post key={post.id} diary={post} />
          ))}
        </ul>
      </main>
    </div>
  );
}
