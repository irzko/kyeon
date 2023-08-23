"use client";
import Dropdown from "@/components/Dropdown";
import LoadingScreen from "@/components/loading-screen";
import PostType from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Post = ({ post }: { post: PostType }) => {
  const date = new Date(post.date).toLocaleString();
  return (
    <li className="mb-6 ml-4">
      <div className="absolute w-3 h-3 bg-[#7F669D] rounded-full mt-4 -left-1.5 border border-white"></div>
      <div className="relative px-2 py-2 bg-white rounded-3xl">
        <Dropdown post={post} />
        <time className="mb-1 text-sm leading-none font-bold text-[#7F669D] bg-[#F8E8EE] rounded-full px-2 py-1">
          {date}
        </time>
        <h3 className="text-lg font-semibold text-gray-900">{post.content}</h3>
        <p className="mb-4 text-base font-normal text-gray-500 text-right">
          - {post.author} -
        </p>
      </div>
    </li>
  );
};

const Page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch("/api/diary")
      .then(async (res) => res.json())
      .then((data: PostType[]) => {
        data.sort((postA: PostType, postB: PostType) => {
          const dateA = new Date(postA.date);
          const dateB = new Date(postB.date);
          return dateB.getTime() - dateA.getTime();
        });
        setPosts(data);
      });
  }, []);

  return (
    <div>
      {posts && <LoadingScreen />}
      <main className="p-4">
        <div className="fixed z-50 w-auto bg-white shadow-xl bottom-4 right-4 rounded-full">
          <Link
            href="/diary/create"
            type="button"
            className="flex items-center h-full"
          >
            <button
              type="button"
              className="inline-flex items-center justify-center w-14 h-14 font-medium bg-[#7F669D] rounded-full hover:bg-[##F8E8EE] group focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
            {/* <span className="ml-2 font-medium">Tạo nhật ký</span> */}
          </Link>
        </div>

        <ol className="relative border-l border-[#7F669D]">
          {posts && posts.map((post) => <Post key={post.postId} post={post} />)}
        </ol>
      </main>
    </div>
  );
};

export default Page;
