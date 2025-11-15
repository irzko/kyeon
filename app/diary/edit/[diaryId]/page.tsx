import prisma from "@/libs/prisma";

import { Card, Flex, IconButton, Skeleton, Stack } from "@chakra-ui/react";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import EditForm from "./edit-form";
import { Suspense } from "react";

const DiaryEditPage = async ({ diaryId }: { diaryId: Promise<string> }) => {
  const id = await diaryId;
  const diary = await prisma.diary.findUnique({
    where: {
      id,
    },
  });

  if (!diary) {
    return <p>Bài viết này không tồn tại</p>;
  }
  return <EditForm diary={diary} />;
};

const Page = async ({ params }: { params: Promise<{ diaryId: string }> }) => {
  const diaryId = params.then((p) => p.diaryId);
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

      <Suspense
        fallback={
          <Card.Root rounded="2xl">
            <Card.Body gap="4" asChild>
              <Stack flex="1">
                <Skeleton height="5" />
                <Skeleton height="5" width="80%" />
              </Stack>
            </Card.Body>
          </Card.Root>
        }
      >
        <DiaryEditPage diaryId={diaryId} />
      </Suspense>
    </>
  );
};

export default Page;
