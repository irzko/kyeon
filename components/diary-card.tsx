"use client";
import useModal from "@/hooks/useModal";
import moment from "moment";
import { Yeseva_One } from "next/font/google";
import Button from "./ui/Button";
import ButtonLink from "./ui/ButtonLink";
import { deleteDiary } from "@/app/action";
const yesevaOne = Yeseva_One({ subsets: ["vietnamese"], weight: ["400"] });

const ActionMenu = ({ diary }: { diary: IDiary }) => {
  const [modal, showModal] = useModal();
  return (
    <>
      <Button
        isIconOnly
        color="light"
        onClick={() => {
          showModal("Tuỳ chọn", (onClose) => {
            return (
              <ul className="flex flex-col p-2 space-y-2">
                <li>
                  <ButtonLink
                    color="light"
                    className="justify-start gap-2"
                    href={`diary/edit/${diary.id}`}
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                      />
                    </svg>
                    Chỉnh sửa nhật ký
                  </ButtonLink>
                </li>
                <li>
                  <Button
                    color="light"
                    className="justify-start gap-2 w-full"
                    onClick={() => {
                      showModal("Xoá nhật ký", () => {
                        return (
                          <div className="p-4 space-y-2">
                            <p>Bạn có chắc chắn muốn xoá nhật ký này?</p>
                            <div className="flex justify-end gap-2">
                              <form
                                action={(formData) => {
                                  formData.append("id", diary.id);
                                  deleteDiary(formData);
                                }}
                              >
                                <Button color="danger">Xoá</Button>
                              </form>
                              <Button onClick={() => onClose()} color="light">
                                Huỷ
                              </Button>
                            </div>
                          </div>
                        );
                      });
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                    Xoá nhật ký
                  </Button>
                </li>
              </ul>
            );
          });
        }}
      >
        ···
      </Button>
      {modal}
    </>
  );
};

const DiaryCard = ({ diary }: { diary: IDiary }) => {
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  
  return (
    <>
      <li className="ml-4 mb-3">
        <motion.div style={{ scale }} className="flex flex-col bg-white rounded-lg border border-gray-100">
          <div className="flex justify-between items-center pt-2 px-2">
            <div className="flex items-center mr-2 px-2.5 py-0.5">
              <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-1.5 ring-1 ring-white"></div>
              <time
                className={`w-full text-gray-500 text-sm rounded-full ${yesevaOne.className}`}
              >
                Ngày thứ {moment(diary.date).diff(moment("2023-07-27"), "days")}
              </time>
            </div>
            <ActionMenu diary={diary} />
          </div>
          <div className="py-10 px-4">
            <p
              className={`text-xl pb-6 text-center text-gray-900 ${yesevaOne.className}`}
            >
              &quot;
              {diary.content}
              &quot;
            </p>

            <p
              className={`text-base font-normal text-gray-700 text-center ${yesevaOne.className}`}
            >
              - {diary.author}
            </p>
          </div>
        </motion.div>
      </li>
    </>
  );
};

export default DiaryCard;
