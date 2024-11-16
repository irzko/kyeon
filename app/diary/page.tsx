import { unstable_cache } from 'next/cache';
import prisma from "@/libs/prisma";
import { Navbar, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import Link from "next/link";
import { Style_Script } from "next/font/google";
import Post from "@/components/diary/post";


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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#ffffff"} fill={"none"}>
                <path d="M9 22L9.00192 17.9976C9.00236 17.067 9.00258 16.6017 9.15462 16.2347C9.35774 15.7443 9.74746 15.3547 10.2379 15.1519C10.6051 15 11.0704 15 12.001 15V15C12.9319 15 13.3974 15 13.7647 15.152C14.2553 15.355 14.645 15.7447 14.848 16.2353C15 16.6026 15 17.0681 15 17.999V22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.08848 4.76243L6.08847 5.54298C4.57181 6.72681 3.81348 7.31873 3.40674 8.15333C3 8.98792 3 9.95205 3 11.8803V13.9715C3 17.7562 3 19.6485 4.17157 20.8243C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8243C21 19.6485 21 17.7562 21 13.9715V11.8803C21 9.95205 21 8.98792 20.5933 8.15333C20.1865 7.31873 19.4282 6.72681 17.9115 5.54298L16.9115 4.76243C14.5521 2.92081 13.3724 2 12 2C10.6276 2 9.44787 2.92081 7.08848 4.76243Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg></Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#ffffff"} fill={"none"}>
                <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/diary/create"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#ffffff"} fill={"none"}>
                <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#ffffff"} fill={"none"}>
                <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#ffffff"} fill={"none"}>
                <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
