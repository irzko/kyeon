import Dropdown from "@/components/Dropdown";
import DiaryType from "@/types";

const Diary = ({ diary }: { diary: DiaryType }) => {
  return (
    <li className="mb-4 ml-4">
      <div className="absolute w-3 h-3 bg-[#7F669D] rounded-full mt-4 -left-1.5 border border-white"></div>
      <div className="relative px-2 py-2 bg-white rounded-3xl">
        <div className="flex justify-between">
          <time className="mb-1 text-sm leading-none font-bold text-[#7F669D] bg-[#F8E8EE] rounded-full px-2 flex items-center">
            {new Date(diary.datetime).toLocaleString()}
          </time>
          <Dropdown diary={diary} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {diary.content}
          </h3>
          <p className="text-base font-normal italic text-gray-500 text-right">
            {diary.author}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Diary;
