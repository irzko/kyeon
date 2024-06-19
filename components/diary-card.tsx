"use client";
import useModal from "@/hooks/useModal";
import moment from "moment";
import { Yomogi } from "next/font/google";
import Button from "./ui/Button";
import ButtonLink from "./ui/ButtonLink";
import { deleteDiary } from "@/app/action";

const yomogi = Yomogi({ subsets: ["vietnamese"], weight: ["400"] });

const ActionMenu = ({ diary }: { diary: IDiary }) => {
  const [modal, showModal] = useModal();
  return (
    <>
      <Button
        isIconOnly
        color="light"
        onClick={() => {
          showModal("Tuỳ chọn", () => {
            return (
              <ul className="flex flex-col p-4 space-y-2">
                <li>
                  <ButtonLink
                    color="light"
                    className="justify-start"
                    href={`diary/edit/${diary.id}`}
                  >
                    Chỉnh sửa nhật ký
                  </ButtonLink>
                </li>
                <li>
                  <Button
                    color="light"
                    className="justify-start w-full"
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
                              <Button color="light">Huỷ</Button>
                            </div>
                          </div>
                        );
                      });
                    }}
                  >
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
  return (
    <>
      <li className="ml-4 mb-3">
        <div className="flex flex-col bg-white rounded-lg border border-gray-100">
          <div className="flex justify-between items-center pt-2 px-2">
            <div className="flex items-center mr-2 px-2.5 py-0.5">
              <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-1.5 ring-1 ring-white"></div>
              <time
                className={`w-full text-gray-500 text-sm rounded-full ${yomogi.className}`}
              >
                Ngày thứ {moment(diary.date).diff(moment("2023-07-27"), "days")}
              </time>
            </div>
            <ActionMenu diary={diary} />
          </div>
          <div className="py-10 px-4">
            <p
              className={`text-lg pb-6 text-center text-gray-900 ${yomogi.className}`}
            >
              &quot;
              {diary.content}
              &quot;
            </p>

            <p
              className={`text-base font-normal text-gray-700 text-center ${yomogi.className}`}
            >
              - {diary.author}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default DiaryCard;
