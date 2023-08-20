"use client";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const CountDays = () => {
  const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  const router = useRouter();
  const [love, setLove] = useState(0);

  const loveDay = "July, 27, 2023";

  useEffect(() => {
    fetch("/api/love")
      .then((res) => res.json())
      .then((data) => {
        setLove(data);
      });
  }, []);

  const handleClick = () => {
    fetch("/api/love", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        love: love + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLove(data);
      });
  };

  const getTime = (loveDay: string) => {
    const time = Date.now() - Date.parse(loveDay);
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    // setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    // setMinutes(Math.floor((time / 1000 / 60) % 60));
    // setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(loveDay), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="absolute bg-red z-50 top-20">
        <p className="text-red-600 border-2 font-bold border-red-600 px-4 py-2 rounded-full">Số lần thương: {love}</p>
      </div>
      <div className="absolute">
        {days ? (
          <div
            className="flex flex-col justify-center items-center"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={280}
              fill="#FBA1B7"
              className="blur-2xl"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={280}
              fill="#FBA1B7"
              className="absolute"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
            {/* <Image src={Heart} width={500} height={500} className=" absolute mt-12" alt="" quality={100} /> */}
            <div className="z-10 absolute mb-10">
              <h2 className="text-[#FDE5EC]">Nguyệt x Kha</h2>
              <p className="text-xl font-bold text-[#BB2525]">Đã bên nhau</p>
              <div className="text-5xl font-bold text-[#FDE5EC]">
                <span className="text-[#BB2525]">{days}</span> ngày
              </div>
            </div>
            {/* <p>
            {hours} giờ {minutes} phút {seconds} giây
          </p> */}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default CountDays;
