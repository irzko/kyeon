"use client";

import { useFormStatus } from "react-dom";
import Button from "./button";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" color="primary" disabled={pending}>
        {pending ? "Đang lưu..." : "Lưu"}
      </Button>
    </>
  );
}
