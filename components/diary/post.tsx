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
import Link from "next/link";
import { Suspense } from "react";
import { Em, Heading, Text, Blockquote, Box } from "@chakra-ui/react";
import OptionMenu from "./option-menu";

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
  // p({ children }) {
  //   return <p className="text-gray-500">{children}</p>;
  // },
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
  table({ children }) {
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          {children}
        </table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        {children}
      </thead>
    );
  },
  th({ children }) {
    return (
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {children}
      </th>
    );
  },
  td({ children }) {
    return <td className="px-6 py-4">{children}</td>;
  },
  tr({ children }) {
    return <tr className="border-b">{children}</tr>;
  },
  ul({ children }) {
    return (
      <ul className="space-y-1 text-gray-500 list-disc list-inside">
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol className="space-y-1 text-gray-500 list-decimal list-inside">
        {children}
      </ol>
    );
  },
  li({ children }) {
    return <li>{children}</li>;
  },
  a({ href, children }) {
    return (
      <Link
        className="font-medium text-blue-600 hover:underline"
        href={href || ""}
      >
        {children}
      </Link>
    );
  },
  hr() {
    return <hr className="h-px my-8 bg-gray-200 border-0" />;
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
        <Box
          display="flex"
          flexDirection="column"
          bg="black/70"
          rounded="2xl"
          borderWidth="1px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt="2"
            px="2"
          >
            <h3>
              Ngày thứ{" "}
              <strong>
                {/* {moment(diary.date).diff(moment("2023-07-27"), "days")} */}
              </strong>
            </h3>
            <OptionMenu diaryId={diary.id} />
          </Box>
          <Box py="6" px="4" spaceY="6">
            <Suspense
              fallback={
                <div className="w-full h-48 bg-gray-700 rounded-lg animate-pulse"></div>
              }
            >
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
        </Box>
      </li>
    </>
  );
};

export default Post;
