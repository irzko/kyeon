"use client";
import Link from "next/link";
import {
  ButtonGroup,
  IconButton,
  IconButtonProps,
  Pagination as ChakraPagination,
  usePaginationContext,
} from "@chakra-ui/react";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const PaginationLink = (
  props: IconButtonProps & { page?: "prev" | "next" | number }
) => {
  const { page, ...rest } = props;
  const pagination = usePaginationContext();
  const pageValue = () => {
    if (page === "prev") return pagination.previousPage;
    if (page === "next") return pagination.nextPage;
    return page;
  };
  return (
    <IconButton rounded="xl" asChild {...rest}>
      <Link href={`/diary/page/${pageValue()}`}>{props.children}</Link>
    </IconButton>
  );
};

export default function Pagination({
  pageIndex,
  totalPosts,
  pageSize,
  defaultPage,
}: {
  pageIndex: number;
  totalPosts: number;
  pageSize: number;
  defaultPage: number;
}) {
  return (
    <ChakraPagination.Root
      textAlign="center"
      mb="24"
      count={totalPosts}
      page={pageIndex}
      pageSize={pageSize}
      defaultPage={defaultPage}
    >
      <ButtonGroup variant="ghost" size="sm">
        <PaginationLink page="prev">
          <HiChevronLeft />
        </PaginationLink>

        <ChakraPagination.Items
          render={(page) => (
            <PaginationLink
              page={page.value}
              variant={{ base: "ghost", _selected: "outline" }}
            >
              {page.value}
            </PaginationLink>
          )}
        />

        <PaginationLink page="next">
          <HiChevronRight />
        </PaginationLink>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
