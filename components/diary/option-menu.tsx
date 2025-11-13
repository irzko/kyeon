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
            <Dialog.Header borderBottomWidth="1px">
              <Dialog.Title>Tuỳ chọn bài viết</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack>
                <Dialog.ActionTrigger asChild>
                  <Button variant="ghost" asChild>
                    <Link href={`diary/edit/${diaryId}`}>
                      Chỉnh sửa bài viết
                    </Link>
                  </Button>
                </Dialog.ActionTrigger>
                <Dialog.Root size="xs" placement="center">
                  <Dialog.Trigger asChild>
                    <Button variant="ghost" colorPalette="red">
                      Xoá bài viết
                    </Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Xoá nhật ký</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <p>Bạn có chắc chắn muốn xoá nhật ký này?</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Huỷ</Button>
                          </Dialog.ActionTrigger>
                          <form
                            action={(formData) => {
                              formData.append("id", diaryId);
                              deleteDiary(formData);
                            }}
                          >
                            <Dialog.ActionTrigger asChild>
                              <Button type="submit" colorPalette="red">
                                Xoá
                              </Button>
                            </Dialog.ActionTrigger>
                          </form>
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
