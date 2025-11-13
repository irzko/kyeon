import {
  MDXComponents,
  MDXRemote,
  type MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import supersub from "remark-supersub";
import remarkIns from "remark-ins";
import Image from "next/image";
import NextLink from "next/link";
import { Suspense } from "react";
import {
  Em,
  Heading,
  Text,
  Blockquote,
  Box,
  Flex,
  List,
  SkeletonText,
  Link,
} from "@chakra-ui/react";
import OptionMenu from "./option-menu";
import { differenceInDays } from "date-fns";
import DiffDays from "./diff-days";

const components: MDXComponents = {
  h1({ children }) {
    return (
      <Heading as="h1" size="4xl">
        {children}
      </Heading>
    );
  },
  h2({ children }) {
    return (
      <Heading as="h2" size="3xl">
        {children}
      </Heading>
    );
  },
  h3({ children }) {
    return (
      <Heading as="h3" size="2xl">
        {children}
      </Heading>
    );
  },
  h4({ children }) {
    return (
      <Heading as="h4" size="xl">
        {children}
      </Heading>
    );
  },
  h5({ children }) {
    return (
      <Heading as="h5" size="lg">
        {children}
      </Heading>
    );
  },

  h6({ children }) {
    return (
      <Heading as="h6" size="xl">
        {children}
      </Heading>
    );
  },
  strong({ children }) {
    return (
      <Text as="strong" fontWeight="bold">
        {children}
      </Text>
    );
  },
  u({ children }) {
    return (
      <Text as="u" textDecoration="underline">
        {children}
      </Text>
    );
  },
  em({ children }) {
    return <Em>{children}</Em>;
  },

  blockquote({ children }) {
    return (
      <Blockquote.Root variant="subtle">
        <Blockquote.Content>{children}</Blockquote.Content>
      </Blockquote.Root>
    );
  },

  img({ alt, src }) {
    return src ? (
      <Image
        width={0}
        height={0}
        alt={alt || src}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        src={src || "./no-image.jpg"}
        className="rounded-lg"
      />
    ) : (
      <></>
    );
  },

  ul({ children }) {
    return <List.Root>{children}</List.Root>;
  },
  ol({ children }) {
    return <List.Root as="ol">{children}</List.Root>;
  },
  li({ children }) {
    return <List.Item>{children}</List.Item>;
  },
  a({ href, children }) {
    return (
      <Link asChild>
        <NextLink href={href || ""}>{children}</NextLink>
      </Link>
    );
  },
};

const options: MDXRemoteOptions = {
  mdxOptions: {
    // rehypePlugins: [[rehypeHighlight]],
    remarkPlugins: [
      [remarkGfm, { singleTilde: false }],
      [emoji, { emoticon: true }],
      [supersub],
      [remarkIns],
      // [remarkComment],
      // [remarkFlexibleMarkers],
      // [remarkFlexibleContainers],
    ],
  },
  // parseFrontmatter: true,
};

const Post = ({ diary }: { diary: IDiary }) => {
  return (
    <>
      <li>
        <Flex direction="column" bg="black/70" rounded="2xl" borderWidth="1px">
          <Flex justify="space-between" align="center" pt="2" px="2">
            <h3>
              Ngày thứ <DiffDays day={diary.date} />
            </h3>
            <OptionMenu diaryId={diary.id} />
          </Flex>
          <Box py="6" px="6" spaceY="6">
            <Suspense fallback={<SkeletonText noOfLines={3} gap="4" />}>
              <MDXRemote
                source={diary.content}
                options={options}
                components={components}
              />
            </Suspense>
            <Text textAlign="center">
              by <strong>{diary.author}</strong>
            </Text>
          </Box>
        </Flex>
      </li>
    </>
  );
};

export default Post;
