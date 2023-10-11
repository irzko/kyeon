import toISOTimeZoneOffset from "@/libs/toISOTimeZoneOffset";
import { FormEventHandler } from "react";

const Form = ({
  diary,
  onSubmit,
}: {
  diary?: IDiary;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}) => {
  return (
    <form
      id="diary-form"
      className="p-4 mt-14 max-w-screen-md mx-auto flex flex-col"
      onSubmit={onSubmit}
    >
      <div className="mb-6">
        <label
          htmlFor="date"
          className="block mb-2 font-medium text-gray-900 dark:text-white"
        >
          Ngày diễn ra
        </label>
        <input
          type="datetime-local"
          id="date"
          defaultValue={
            diary
              ? toISOTimeZoneOffset(new Date(diary.date))
              : toISOTimeZoneOffset(new Date())
          }
          className="bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        ></input>
      </div>
      <div className="mb-6">
        <label
          htmlFor="content"
          className="block mb-2 font-medium text-gray-900 dark:text-white"
        >
          Nội dung
        </label>
        <textarea
          id="content"
          rows={10}
          className="bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Hãy viết gì đó..."
          defaultValue={diary?.content}
          required
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          htmlFor="author"
          className="block mb-2 font-medium text-gray-900 dark:text-white"
        >
          Người viết
        </label>
        <input
          type="text"
          id="author"
          className="bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ tên hoặc nickname"
          defaultValue={diary?.author}
          required
        ></input>
      </div>
    </form>
  );
};

export default Form;
