import moment from "moment";
import {
  MDXComponents,
  MDXRemote,
  type MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import ActionMenu from "./action-menu";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import supersub from "remark-supersub";
import remarkIns from "remark-ins";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const components: MDXComponents = {
  h1({ children }) {
    return <h1 className="text-4xl">{children}</h1>;
  },
  // h2({ children }) {
  //   return <h2 className="text-3xl font-medium">{children}</h2>;
  // },
  h3({ children }) {
    return <h3 className="text-2xl font-medium">{children}</h3>;
  },
  h4({ children }) {
    return <h4 className="text-lg font-medium">{children}</h4>;
  },
  h5({ children }) {
    return <h5 className="text-sm font-medium">{children}</h5>;
  },

  h6({ children }) {
    return <h6 className="text-xs font-medium">{children}</h6>;
  },
  strong({ children }) {
    return <strong className="font-bold">{children}</strong>;
  },
  u({ children }) {
    return <u className="underline">{children}</u>;
  },
  em({ children }) {
    return <em className="italic">{children}</em>;
  },
  // p({ children }) {
  //   return <p className="text-gray-500">{children}</p>;
  // },
  blockquote({ children }) {
    return (
      <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50">
        {children}
      </blockquote>
    );
  },

  img({ alt, src }) {
    return (
      <Image
        width={0}
        height={0}
        alt={alt || ""}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        src={src || "./no-image.jpg"}
        className="rounded-lg"
      />
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
        <div className="flex flex-col bg-gray-700/70 rounded-2xl border border-gray-700 shadow">
          <div className="flex justify-between items-center pt-2 px-2">
            <h3 className="w-full text-gray-400 text-base">
              Ngày thứ{" "}
              <strong>
                {moment(diary.date).diff(moment("2023-07-27"), "days")}
              </strong>
            </h3>
            <ActionMenu diary={diary} />
          </div>
          <div className="py-6 px-4 space-y-6">
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
            <p className="text-base font-normal text-gray-400 text-center">
              by <strong>{diary.author}</strong>
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default Post;
