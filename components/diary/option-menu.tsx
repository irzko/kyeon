"use client";
import {
  Button,
  Portal,
  Dialog,
  CloseButton,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { deleteDiary } from "@/app/action";
import Link from "next/link";
import { FiMoreHorizontal } from "react-icons/fi";

export default function OptionMenu({ diaryId }: { diaryId: string }) {
  return (
    <Dialog.Root size="xs" placement="center">
      <Dialog.Trigger asChild>
        <IconButton variant="ghost" size="sm" rounded="xl">
          <FiMoreHorizontal />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content rounded="2xl">
            <Dialog.Header py="0.75rem" borderBottomWidth="1px">
              <Dialog.Title fontSize="sm">Tuỳ chọn bài viết</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={0}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`diary/edit/${diaryId}`}>
                      Chỉnh sửa bài viết
                    </Link>
                  </Button>
                </Dialog.ActionTrigger>
                <Dialog.Root size="xs" placement="center">
                  <Dialog.Trigger asChild>
                    <Button variant="ghost" size="sm" colorPalette="red">
                      Xoá bài viết
                    </Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content rounded="2xl">
                        <Dialog.Header py="0.75rem" borderBottomWidth="1px">
                          <Dialog.Title fontSize="sm">Xoá nhật ký</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <p>Bạn có chắc chắn muốn xoá nhật ký này?</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <form
                            action={(formData) => {
                              formData.append("id", diaryId);
                              deleteDiary(formData);
                            }}
                          >
                            <Dialog.ActionTrigger asChild>
                              <Button
                                type="submit"
                                size="sm"
                                variant="ghost"
                                colorPalette="red"
                              >
                                Xoá
                              </Button>
                            </Dialog.ActionTrigger>
                          </form>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Huỷ
                            </Button>
                          </Dialog.ActionTrigger>
                        </Dialog.Footer>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Stack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton rounded="xl" size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
