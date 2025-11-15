"use client";
import SubmitButton from "@/components/submit-button";
import { createDiaryAction } from "@/app/action";
import { Card, Flex, IconButton, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { EditorState } from "lexical";
import { PLAYGROUND_TRANSFORMERS } from "@/components/lexical/plugins/MarkdownTransformers";
import { $convertToMarkdownString } from "@lexical/markdown";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { format } from "date-fns";

const LexicalEditor = dynamic(() => import("@/components/lexical"), {
  ssr: false,
});

function DateTimeInput() {
  const [elapsedTime, setElapsedTime] = useState("");
  useEffect(() => {
    const now = Date.now();
    setElapsedTime(format(new Date(now), "yyyy-MM-dd'T'HH:mm"));
  }, []);
  return (
    <Input
      type="datetime-local"
      rounded="xl"
      bg="gray.900"
      outline="none"
      id="date"
      name="date"
      defaultValue={elapsedTime}
      required
    ></Input>
  );
}

const Page = () => {
  const [content, setContent] = useState("");
  const handleChange = useCallback((editorState: EditorState) => {
    editorState.read(() => {
      const markdownText = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
      setContent(markdownText);
    });
  }, []);

  return (
    <>
      <Flex align="center" py={2} gap={2}>
        <IconButton rounded="xl" variant="ghost" asChild>
          <Link href="/diary">
            <FiChevronLeft />
          </Link>
        </IconButton>
        <h1>Bài viết mới</h1>
      </Flex>
      <Card.Root rounded="2xl" asChild>
        <form
          id="diary-form"
          action={(formData) => {
            formData.append("content", content);
            createDiaryAction(formData);
          }}
        >
          <Card.Body gap="4">
            <DateTimeInput />
            <Input
              type="text"
              id="author"
              bg="gray.900"
              name="author"
              rounded="xl"
              outline="none"
              placeholder="Người viết"
              required
            ></Input>
            <div>
              <LexicalEditor onChange={handleChange} />
            </div>

            <SubmitButton />
          </Card.Body>
        </form>
      </Card.Root>
    </>
  );
};

export default Page;
