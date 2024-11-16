import { unstable_cache } from 'next/cache';
import prisma from "@/libs/prisma";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import Link from "next/link";
import { Style_Script } from "next/font/google";
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
      <Navbar position="bottom">

        <NavbarContent className="w-full justify-evenly">
          <NavbarItem>
            <Link href="/diary">
              <svg className="w-[36px] h-[36px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
              </svg></Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/diary/create"
            >
              <svg className="w-[36px] h-[36px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7 7V5" />
              </svg>
            </ButtonLink>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">
              <svg className="w-[36px] h-[36px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
              </svg>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="max-w-screen-sm mx-auto p-4">
        <Link
          href="/"
          className={` ${styleScript.className} mb-4 block text-center text-3xl font-black whitespace-nowrap text-white`}
        >
          #nhatkyvutru
        </Link>
        <ul className="mb-20 list-none space-y-4">
          {posts?.map((post) => (
            <Post key={post.id} diary={post} />
          ))}
        </ul>
      </main>
    </div>
  );
}
