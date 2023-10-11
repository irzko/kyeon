import Dropdown from "@/components/Dropdown";

const DiaryCard = ({ diary }: { diary: IDiary }) => {
  return (
    <li className="mb-4 ml-4">
      <div className="absolute w-3 h-3 bg-blue-100 dark:bg-blue-900 rounded-full mt-5 -left-1.5 ring-1 ring-white dark:ring-gray-900"></div>
      <div className="flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-white dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-lg-light dark:bg-gray-900">
        <div className="flex justify-between pt-2 px-2">
          <time className="bg-blue-100 flex items-center font-bold text-blue-800 text-sm mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {diary.date}
          </time>
          <Dropdown diary={diary} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold dark:text-white text-gray-900">
            {diary.content}
          </h3>
          <p className="text-base font-normal italic text-gray-700 dark:text-gray-400 text-right">
            {diary.author}
          </p>
        </div>
      </div>
    </li>
  );
};

export default DiaryCard;
