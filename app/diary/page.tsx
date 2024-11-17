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
              {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#ffffff"} fill={"none"}>
                <path d="M9 22L9.00192 17.9976C9.00236 17.067 9.00258 16.6017 9.15462 16.2347C9.35774 15.7443 9.74746 15.3547 10.2379 15.1519C10.6051 15 11.0704 15 12.001 15V15C12.9319 15 13.3974 15 13.7647 15.152C14.2553 15.355 14.645 15.7447 14.848 16.2353C15 16.6026 15 17.0681 15 17.999V22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.08848 4.76243L6.08847 5.54298C4.57181 6.72681 3.81348 7.31873 3.40674 8.15333C3 8.98792 3 9.95205 3 11.8803V13.9715C3 17.7562 3 19.6485 4.17157 20.8243C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8243C21 19.6485 21 17.7562 21 13.9715V11.8803C21 9.95205 21 8.98792 20.5933 8.15333C20.1865 7.31873 19.4282 6.72681 17.9115 5.54298L16.9115 4.76243C14.5521 2.92081 13.3724 2 12 2C10.6276 2 9.44787 2.92081 7.08848 4.76243Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" color="#ffffff">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 1.25C11.1264 1.25 10.3521 1.54948 9.52635 2.04882C8.72657 2.53243 7.81252 3.2459 6.66505 4.14157L5.4817 5.06519C4.10576 6.13845 3.21633 6.83222 2.73262 7.82476C2.2491 8.8169 2.24947 9.9466 2.25004 11.6956L2.25008 14.0278C2.25006 15.8724 2.25005 17.3329 2.40317 18.4758C2.56069 19.6516 2.89249 20.6031 3.64038 21.3536C4.38864 22.1046 5.3378 22.438 6.51071 22.5963C7.02433 22.6656 7.60226 22.7037 8.25047 22.7246L8.25224 17.9723C8.2524 17.5285 8.25253 17.158 8.27338 16.8538C8.29507 16.5371 8.3417 16.238 8.46177 15.948C8.74102 15.2735 9.27699 14.7378 9.95158 14.4588C10.2416 14.3388 10.5407 14.2923 10.8574 14.2707C11.1616 14.25 11.532 14.25 11.9758 14.25H11.9759H12.0263C12.4703 14.25 12.8409 14.25 13.1452 14.2707C13.4619 14.2923 13.7612 14.3389 14.0513 14.4589C14.726 14.738 15.262 15.274 15.5411 15.9487C15.6611 16.2388 15.7077 16.5381 15.7293 16.8548C15.75 17.1591 15.75 17.5297 15.75 17.9737V22.7245C16.3981 22.7036 16.9759 22.6656 17.4895 22.5963C18.6624 22.438 19.6115 22.1046 20.3598 21.3536C21.1077 20.6031 21.4395 19.6516 21.597 18.4758C21.7501 17.3329 21.7501 15.8724 21.7501 14.0278V14.0277L21.7501 11.6956C21.7507 9.9466 21.7511 8.81691 21.2675 7.82476C20.7838 6.83222 19.8944 6.13845 18.5185 5.06519L17.3351 4.14158C16.1876 3.2459 15.2736 2.53243 14.4738 2.04882C13.648 1.54948 12.8738 1.25 12.0001 1.25ZM14.25 22.7482V17.9989C14.25 17.5232 14.2496 17.204 14.2327 16.9568C14.2164 16.7163 14.1869 16.5992 14.1551 16.5222C14.0282 16.2155 13.7845 15.9718 13.4778 15.8449C13.4008 15.8131 13.2837 15.7836 13.0432 15.7673C12.796 15.7504 12.4768 15.75 12.0011 15.75C11.5256 15.75 11.2065 15.7504 10.9594 15.7672C10.719 15.7836 10.6019 15.813 10.5249 15.8449C10.2182 15.9717 9.97461 16.2152 9.84768 16.5218C9.81578 16.5989 9.78634 16.7159 9.76987 16.9563C9.75294 17.2034 9.75241 17.5225 9.75223 17.998L9.75047 22.7482C10.129 22.75 10.5264 22.75 10.9435 22.75H13.0567C13.4739 22.75 13.8714 22.75 14.25 22.7482Z" fill="#ffffff"></path>
              </svg>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/search">
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
        <ul className="mb-14 list-none space-y-4">
          {posts?.map((post) => (
            <Post key={post.id} diary={post} />
          ))}
        </ul>
      </main>
    </div>
  );
}
