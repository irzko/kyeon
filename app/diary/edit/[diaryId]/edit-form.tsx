"use client";
import SubmitButton from "@/components/submit-button";
import { format } from "date-fns";
import { Card, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { EditorState } from "lexical";
import { PLAYGROUND_TRANSFORMERS } from "@/components/lexical/plugins/MarkdownTransformers";
import { $convertToMarkdownString } from "@lexical/markdown";
const DayInput = dynamic(() => import("@/components/diary/day-input"), {
  ssr: false,
});

import { updateAction } from "@/app/action";
const LexicalEditor = dynamic(() => import("@/components/lexical"), {
  ssr: false,
});

const EditForm = ({ diary }: { diary: IDiary }) => {
  if (diary === null) {
    return <p>Bài viết này không tồn tại</p>;
  }

  const [content, setContent] = useState(diary?.content || "");
  const handleChange = useCallback((editorState: EditorState) => {
    editorState.read(() => {
      const markdownText = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
      setContent(markdownText);
    });
  }, []);

  return (
    <>
      <Card.Root rounded="2xl" asChild>
        <form
          id="diary-form"
          action={(formData) => {
            formData.append("content", content);
            formData.append("id", diary.id);
            updateAction(formData);
          }}
        >
          <Card.Body gap="4">
            <DayInput defaultValue={format(diary.date, "yyyy-MM-dd'T'HH:mm")} />
            <Input
              type="text"
              rounded="xl"
              bg="gray.900"
              outline="none"
              id="author"
              name="author"
              defaultValue={diary?.author || ""}
              placeholder="Người viết"
              required
            ></Input>
            <div>
              <LexicalEditor
                onChange={handleChange}
                markdown={diary?.content || ""}
              />
            </div>

            <SubmitButton />
          </Card.Body>
        </form>
      </Card.Root>
    </>
  );
};

export default EditForm;
