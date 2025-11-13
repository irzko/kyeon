"use client";
import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        type="submit"
        colorPalette="blue"
        variant="surface"
        loading={pending}
      >
        Lưu
      </Button>
    </>
  );
}
