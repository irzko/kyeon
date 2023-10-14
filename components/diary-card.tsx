import Dropdown from "@/components/Dropdown";
import { Yomogi } from "next/font/google";

const yomogi = Yomogi({ subsets: ["vietnamese"], weight: ["400"] });

const DiaryCard = ({ diary }: { diary: IDiary }) => {
  const date = new Date(diary.date).toLocaleDateString("vi-VN");
  return (
    <li className="ml-4 mb-3">
      <div className="absolute w-3 h-3 bg-gray-100 dark:bg-white rounded-full mt-5 -left-1.5 ring-1 ring-white dark:ring-gray-900"></div>
      <div className="flex flex-col bg-gray-50 rounded-lg border border-gray-100 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex justify-between pt-2 px-2">
          <time
            className={`flex w-full items-center font-bold text-gray-500 text-sm mr-2 px-2.5 py-0.5 rounded-full dark:text-gray-400 ${yomogi.className}`}
          >
            {date}
          </time>
          <Dropdown diary={diary} />
        </div>
        <div className="py-10 px-4">
          <p
            className={`text-lg dark:text-white pb-6 text-center text-gray-900 ${yomogi.className}`}
          >
            &quot;
            {diary.content}
            &quot;
          </p>

          <p
            className={`text-base font-normal text-gray-700 dark:text-gray-400 text-center  ${yomogi.className}`}
          >
            - {diary.author}
          </p>
        </div>
      </div>
    </li>
  );
};

export default DiaryCard;
