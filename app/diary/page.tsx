"use server";

import prisma from "@/libs/prisma";
import Link from "next/link";
import { Box, Button, Link as ChakraLink, IconButton } from "@chakra-ui/react";
import { Style_Script } from "next/font/google";
import Post from "@/components/diary/post";
import { cacheTag } from "next/cache";
import { HiPencilSquare } from "react-icons/hi2";

const styleScript = Style_Script({ subsets: ["vietnamese"], weight: ["400"] });

const getPosts = async () => {
  "use cache";
  cacheTag("diary");
  return await prisma.diary.findMany({ orderBy: { date: "desc" } });
};

export default async function Page() {
  const posts: IDiary[] = await getPosts();
  return (
    <>
      <Box textAlign="center" my="10">
        <Button variant="plain" fontSize="3xl" asChild>
          <Link href="/" className={` ${styleScript.className}`}>
            #nhatkyvutru
          </Link>
        </Button>
      </Box>
      <Box asChild mb="14" spaceY="4" listStyle="none">
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
    </>
  );
}
