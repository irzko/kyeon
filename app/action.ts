"use server";
import prisma from "@/libs/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createDiary = async (formData: FormData) => {
  "use server";
  await prisma.diary.create({
    data: {
      date: new Date(formData.get("date") as string),
      content: formData.get("content") as string,
      author: formData.get("author") as string,
    },
  });
  revalidateTag("diary");
  redirect("/diary");
};
