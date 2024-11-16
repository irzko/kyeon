
import moment from "moment";
import { MDXRemote } from "next-mdx-remote/rsc";
import ActionMenu from "./action-menu";

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
            <MDXRemote source={diary.content} />
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
