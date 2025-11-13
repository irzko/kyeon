"use client";
import SubmitButton from "@/components/submit-button";
import { format } from "date-fns";
import { Card, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { EditorState } from "lexical";
import { PLAYGROUND_TRANSFORMERS } from "@/components/lexical/plugins/MarkdownTransformers";
import { $convertToMarkdownString } from "@lexical/markdown";

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
      <Card.Root bg="black/70" asChild>
        <form
          id="diary-form"
          action={(formData) => {
            formData.append("content", content);
            formData.append("id", diary.id);
            updateAction(formData);
          }}
        >
          <Card.Body gap="2">
            <Input
              type="datetime-local"
              id="date"
              name="date"
              defaultValue={format(
                new Date(diary?.date || Date.now()),
                "yyyy-MM-dd'T'HH:mm"
              )}
              required
            ></Input>
            <Input
              type="text"
              id="author"
              name="author"
              defaultValue={diary?.author || ""}
              placeholder="Người viết"
              required
            ></Input>
            <LexicalEditor
              onChange={handleChange}
              markdown={diary?.content || ""}
            />

            <SubmitButton />
          </Card.Body>
        </form>
      </Card.Root>
    </>
  );
};

export default EditForm;
