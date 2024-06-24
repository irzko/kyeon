"use server";
import prisma from "@/libs/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const deleteDiary = async (formData: FormData) => {
  await prisma.diary.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  revalidateTag("diary");
  redirect("/diary");
};
