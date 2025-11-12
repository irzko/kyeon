"use client";
import { Button, Portal, Dialog, CloseButton, Stack } from "@chakra-ui/react";
import { deleteDiary } from "@/app/action";
import Link from "next/link";

export default function OptionMenu({ diaryId }: { diaryId: string }) {
  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" rounded="xl">
          ...
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
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
                <Dialog.Root>
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
                            <Button colorPalette="red">Xoá</Button>
                          </form>
                        </Dialog.Footer>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Stack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
