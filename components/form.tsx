import LoadingDots from "@/components/loading-dots";
import DiaryType from "@/types";
import { FormEventHandler } from "react";

const Form = ({
  diary,
  onSubmit,
  loading,
}: {
  diary?: DiaryType | undefined;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  loading?: boolean;
}) => {
  return (
    <form className="p-4" onSubmit={onSubmit}>
      <div className="mb-6">
        <label
          htmlFor="datetime"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Ngày diễn ra
        </label>
        <input
          type="datetime-local"
          id="datetime"
          // value={diary?.datetime}
          defaultValue={diary?.datetime}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-[#6750A4] focus:outline-2 block w-full p-2.5"
          required
        ></input>
      </div>
      <div className="mb-6">
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nội dung
        </label>
        <textarea
          id="content"
          rows={10}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-[#6750A4] focus:outline-2"
          placeholder="Hãy viết gì đó..."
          defaultValue={diary?.content}
          required
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          htmlFor="felling"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Cảm xúc
        </label>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
          >
            <path d="M480.173-418.513q-52.193 0-97.674 23.52-45.48 23.52-73.909 66.993-7.205 11.435-1.607 22.281 5.598 10.846 17.376 10.846 5.793 0 10.499-2.807 4.706-2.808 7.885-7.731 23.411-34.18 59.801-52.436t77.846-18.256q41.456 0 77.661 18.666 36.206 18.667 59.616 52.693 3.641 4.666 8.064 7.269 4.423 2.602 10.371 2.602 11.884 0 17.839-10.807 5.956-10.808-1.249-20.987-27.846-43.948-74.28-67.897-46.433-23.949-98.239-23.949Zm139.045-115.539q20.423 0 34.833-14.5 14.41-14.501 14.41-34.923 0-20.422-14.501-34.832t-34.923-14.41q-20.422 0-34.832 14.5-14.41 14.501-14.41 34.923 0 20.422 14.501 34.832 14.5 14.41 34.922 14.41Zm-278.255 0q20.422 0 34.832-14.5 14.41-14.501 14.41-34.923 0-20.422-14.501-34.832-14.5-14.41-34.922-14.41-20.423 0-34.833 14.5-14.41 14.501-14.41 34.923 0 20.422 14.501 34.832 14.5 14.41 34.923 14.41Zm139.104 434.051q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-480Zm-.025 329.744q138.07 0 233.919-95.825 95.85-95.824 95.85-233.894t-95.825-233.919q-95.824-95.85-233.894-95.85t-233.919 95.825q-95.85 95.824-95.85 233.894t95.825 233.919q95.824 95.85 233.894 95.85Z" />
          </svg>
          <input
            id="felling"
            type="range"
            defaultValue={diary?.felling || 50}
            className="w-full h-2 mx-2 bg-[#E6E0E9] rounded-lg accent-[#6750A4] appearance-none cursor-pointer"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
          >
            <path d="M480.173-272.719q51.806 0 98.239-24.077 46.434-24.077 74.28-67.769 7.205-10.436 1.249-21.243-5.955-10.807-17.839-10.807-5.948 0-10.371 2.73-4.423 2.731-8.064 7.398-23.41 33.769-59.58 52.564t-77.705 18.795q-41.151 0-77.69-18.257-36.538-18.256-59.949-52.692-3.179-4.667-7.885-7.603-4.706-2.935-10.499-2.935-11.778 0-17.376 10.846-5.598 10.845 1.607 22.281 28.429 43.729 73.909 67.249 45.481 23.52 97.674 23.52Zm139.045-261.333q20.423 0 34.833-14.5 14.41-14.501 14.41-34.923 0-20.422-14.501-34.832t-34.923-14.41q-20.422 0-34.832 14.5-14.41 14.501-14.41 34.923 0 20.422 14.501 34.832 14.5 14.41 34.922 14.41Zm-278.255 0q20.422 0 34.832-14.5 14.41-14.501 14.41-34.923 0-20.422-14.501-34.832-14.5-14.41-34.922-14.41-20.423 0-34.833 14.5-14.41 14.501-14.41 34.923 0 20.422 14.501 34.832 14.5 14.41 34.923 14.41Zm139.104 434.051q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-480Zm-.025 329.744q138.07 0 233.919-95.825 95.85-95.824 95.85-233.894t-95.825-233.919q-95.824-95.85-233.894-95.85t-233.919 95.825q-95.85 95.824-95.85 233.894t95.825 233.919q95.824 95.85 233.894 95.85Z" />
          </svg>
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="author"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Người viết
        </label>
        <input
          type="text"
          id="author"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-[#6750A4] focus:outline-2"
          placeholder="Họ tên hoặc nickname"
          defaultValue={diary?.author}
          required
        ></input>
      </div>

      <div
        className={`rounded-full hover:shadow-card ${
          loading ? "" : "bg-[#E8DEF8]"
        }`}
      >
        <button
          disabled={loading}
          type="submit"
          className={`${
            loading
              ? "cursor-not-allowed bg-[#1d1b20]/[.12]"
              : "border-black text-[#1D192B] hover:bg-[#1d192b]/[.08] focus:bg-[#1d192b]/[.12]"
          } focus:outline-none font-bold text-sm w-full px-5 py-2.5 text-center text-[#31111D] rounded-full`}
        >
          {loading ? <LoadingDots /> : <p>Lưu</p>}
        </button>
      </div>
    </form>
  );
};

export default Form;
