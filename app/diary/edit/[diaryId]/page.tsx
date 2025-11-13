import prisma from "@/libs/prisma";

import { Flex, IconButton } from "@chakra-ui/react";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import EditForm from "./edit-form";

const Page = async ({ params }: { params: Promise<{ diaryId: string }> }) => {
  const diaryId = (await params).diaryId;
  const diary = await prisma.diary.findUnique({
    where: {
      id: diaryId,
    },
  });

  if (diary === null) {
    return <p>Bài viết này không tồn tại</p>;
  }

  return (
    <>
      <Flex align="center" py={2} gap={2}>
        <IconButton rounded="xl" variant="ghost" asChild>
          <Link href="/diary">
            <FiChevronLeft />
          </Link>
        </IconButton>
        <h1>Chỉnh sửa bài viết</h1>
      </Flex>
      <EditForm diary={diary} />
    </>
  );
};

export default Page;
