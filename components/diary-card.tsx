import Dropdown from "@/components/Dropdown";

const DiaryCard = ({ diary }: { diary: IDiary }) => {
  const date = new Date(diary.date).toLocaleString("vi-VN");
  return (
    <li className="ml-4 mb-3">
      <div className="absolute w-3 h-3 bg-blue-100 dark:bg-blue-900 rounded-full mt-5 -left-1.5 ring-1 ring-white dark:ring-gray-900"></div>
      <div className="flex flex-col bg-white transition duration-300 hover:ease-in-out rounded-lg border border-gray-100 hover:border-white dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-lg-light dark:bg-gray-900">
        <div className="flex justify-between pt-2 px-2">
          <time className="flex items-center font-bold text-gray-500 text-sm mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {date}
          </time>
          <Dropdown diary={diary} />
        </div>
        <div className="p-4">
          <p className="text-lg dark:text-white py-6 text-gray-900 italic">
            <span>&quot;</span>
            {diary.content}
            <span>&quot;</span>
          </p>
          <p className="text-base font-normal italic text-gray-700 dark:text-gray-400 text-right">
            {diary.author}
          </p>
        </div>
      </div>
    </li>
  );
};

export default DiaryCard;
