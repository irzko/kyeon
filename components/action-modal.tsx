import { Dispatch, SetStateAction, useState } from "react";
import DeleteModal from "./delete-modal";
// import RenameModal from "./rename-modal";
import Button from "./button";
import Link from "next/link";

export default function ActionModal({
  showModal,
  setShowModal,
  diary,
}: {
  showModal: boolean;
  diary: IDiary;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed z-50 justify-center items-end md:items-center inset-0 ${
          showModal ? "flex" : "hidden"
        }`}
      >
        <div className="relative md:p-4 max-w-2xl flex w-full">
          <div className="relative p-4 bg-white rounded-2xl shadow dark:bg-gray-800 sm:p-5 w-full">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg line-clamp-1 font-semibold text-gray-900 dark:text-white">
                {diary?.content}
              </h3>
              <button
                onClick={() => setShowModal(!showModal)}
                type="button"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="font-medium text-gray-900 border dark:text-white dark:bg-gray-700 rounded-lg bg-white dark:border-gray-600 border-gray-200">
              <Link
                href={`/diary/edit/${diary.id}`}
                className="relative rounded-t-lg border-b inline-flex items-center w-full px-4 py-3.5 text-sm font-medium border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2 -ml-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                  />
                </svg>
                Chỉnh sửa nhật ký
              </Link>

              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(true);
                  setShowModal(false);
                }}
                className="relative text-red-700 dark:text-red-500 rounded-b-lg inline-flex items-center w-full px-4 py-3.5 text-sm font-medium border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <svg
                  className="mr-2 -ml-1 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                  />
                </svg>
                Xoá nhật ký
              </button>
            </div>
            <div className="mt-6 flex flex-col">
              <Button color="secondary" onClick={() => setShowModal(false)}>
                Huỷ
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        diary={diary}
      />
    </>
  );
}
