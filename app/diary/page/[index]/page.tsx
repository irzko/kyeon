import prisma from "@/libs/prisma";
import Link from "next/link";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { Style_Script } from "next/font/google";
import Post from "@/components/diary/post";
import { cacheTag } from "next/cache";
import { HiPencilSquare } from "react-icons/hi2";
import Pagination from "@/components/diary/pagination";

const styleScript = Style_Script({ subsets: ["vietnamese"], weight: ["400"] });

const countPosts = async () => {
  "use cache";
  cacheTag("diary");
  return await prisma.diary.count();
};

export async function generateStaticParams() {
  const postsCount: number = await countPosts();
  const totalPages = Math.ceil(postsCount / 10);
  return Array.from({ length: totalPages }, (_, i) => ({
    index: (i + 1).toString(),
  }));
}

const getPostsByPage = async (index: number) => {
  "use cache";
  cacheTag("diary");
  return await prisma.diary.findMany({
    skip: (index - 1) * 10,
    take: 10,
    orderBy: { date: "desc" },
  });
};

const Page = async ({ params }: { params: Promise<{ index: string }> }) => {
  const { index } = await params;
  const pageIndex = parseInt(index, 10);
  const posts: IDiary[] = await getPostsByPage(pageIndex);
  const totalPosts: number = await countPosts();
  return (
    <>
      <Box textAlign="center" my="10">
        <Button variant="plain" fontSize="3xl" asChild>
          <Link href="/" className={` ${styleScript.className}`}>
            #nhatkyvutru
          </Link>
        </Button>
      </Box>
      <Box asChild mb="4" spaceY="4" listStyle="none">
        <ul>
          {posts?.map((post) => (
            <Post key={post.id} diary={post} />
          ))}
        </ul>
      </Box>
      <Box position="fixed" bottom="1rem" right="1rem">
        <IconButton rounded="xl" asChild>
          <Link href="/diary/create">
            <HiPencilSquare />
          </Link>
        </IconButton>
      </Box>
      <Pagination
        pageIndex={pageIndex}
        totalPosts={totalPosts}
        pageSize={10}
        defaultPage={1}
      />
    </>
  );
};

export default Page;
