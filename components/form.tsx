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
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Ngày diễn ra
        </label>
        <input
          type="datetime-local"
          id="date"
          defaultValue={diary?.date}
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
