import Dropdown from "@/components/Dropdown";
import DiaryType from "@/types";

const Diary = ({ diary }: { diary: DiaryType }) => {
  return (
    <li className="mb-4 ml-4">
      <div className="absolute w-3 h-3 bg-[#6750A4] rounded-full mt-4 -left-1.5 border border-white"></div>
      <div className="relative px-2 py-2 bg-[#F7F2FA] rounded-2xl">
        <div className="flex justify-between">
          <div className="flex items-center">
            <time className="text-sm leading-none h-full font-bold text-[#1D192B] bg-[#E8DEF8] rounded-full px-2 flex items-center">
              {new Date(diary.datetime).toLocaleString()}
            </time>
            <svg
              className="ml-4 mr-1 text-[#1D192B]"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M300-840q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 5-.5 10t-.5 10h-80q1-5 1-10v-10q0-60-40-100t-100-40q-47 0-87 26.5T518-666h-76q-15-41-55-67.5T300-760q-60 0-100 40t-40 100v10q0 5 1 10H81q0-5-.5-10t-.5-10q0-94 63-157t157-63Zm180 707q-14 0-28-5t-25-16q-34-31-64.5-59T305-267q-27-26-50.5-49T212-360h112q32 31 70 67t86 79q48-43 86-79t70-67h113q-19 21-42.5 44T656-267q-27 26-58 54t-65 59q-11 11-25 16t-28 5Zm-38-187q13 0 22.5-7.5T478-347l54-163 35 52q5 8 14 13t19 5h280q17 0 28.5-11.5T920-480q0-17-11.5-28.5T880-520H623l-69-102q-6-9-15.5-13.5T518-640q-13 0-22.5 7.5T482-613l-54 162-34-51q-5-8-14-13t-19-5H80q-17 0-28.5 11.5T40-480q0 17 11.5 28.5T80-440h257l69 102q6 9 15.5 13.5T442-320Zm38-167Z" />
            </svg>
            <p className="text-base font-bold italic text-[#1D192B]">
              {diary.felling}
            </p>
          </div>
          {/* <Dropdown diary={diary} /> */}
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
