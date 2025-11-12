"use client";
import SubmitButton from "@/components/submit-button";
import { createDiaryAction } from "@/app/action";
import { format } from "date-fns";
import { Input, Stack, Textarea } from "@chakra-ui/react";

const Page = () => {
  return (
    <Stack p="4" asChild>
      <form id="diary-form" action={createDiaryAction}>
        <Input
          type="datetime-local"
          id="date"
          name="date"
          defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          required
        ></Input>
        <Textarea
          id="content"
          name="content"
          rows={15}
          placeholder="Hãy viết gì đó..."
          required
        ></Textarea>
        <Input
          type="text"
          id="author"
          name="author"
          placeholder="Người viết"
          required
        ></Input>
        <SubmitButton />
      </form>
    </Stack>
  );
};

export default Page;
