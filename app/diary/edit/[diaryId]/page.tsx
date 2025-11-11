import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/submit-button";
import { updateTag } from "next/cache";
import { Input, Stack, Textarea } from "@chakra-ui/react";
import { format } from "date-fns";

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
  const updateAction = async (formData: FormData) => {
    "use server";
    await prisma.diary.update({
      where: { id: diaryId },
      data: {
        date: new Date(formData.get("date") as string),
        content: formData.get("content") as string,
        author: formData.get("author") as string,
      },
    });
    updateTag("diary");
    redirect("/diary");
  };

  return (
    <Stack p="4" asChild>
      <form id="diary-form" action={updateAction}>
        <Input
          type="datetime-local"
          id="date"
          name="date"
          defaultValue={diary && format(diary.date, "yyyy-MM-dd'T'HH:mm")}
          required
        />
        <Textarea
          id="content"
          rows={15}
          name="content"
          placeholder="Hãy viết gì đó..."
          defaultValue={diary?.content}
          required
        ></Textarea>
        <Input
          type="text"
          id="author"
          name="author"
          placeholder="Họ tên hoặc nickname"
          defaultValue={diary?.author}
          required
        ></Input>
        <SubmitButton />
      </form>
    </Stack>
  );
};

export default Page;
