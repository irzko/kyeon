"use server";
import prisma from "@/libs/prisma";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export const deleteDiary = async (formData: FormData) => {
  await prisma.diary.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  updateTag("diary");
  redirect("/diary");
};

export const createDiaryAction = async (formData: FormData) => {
  await prisma.diary.create({
    data: {
      date: new Date(formData.get("date") as string),
      content: formData.get("content") as string,
      author: formData.get("author") as string,
    },
  });
  updateTag("diary");
  redirect("/diary");
};
