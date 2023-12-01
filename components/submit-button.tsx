"use client";

import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" color="primary" isLoading={pending}>
        Lưu
      </Button>
    </>
  );
}
