"use client";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const CountDays = () => {
  const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
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
    fetch("/api/love")
      .then((res) => res.json())
      .then((data) => {
        fetch("/api/love", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            love: data + 1,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setLove(data);
          });
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
            <div className="z-10 absolute mb-14 flex flex-col items-center">
              <p className="text-[#BB2525] font-bold px-4 w-24 bg-white rounded-full">
                {love}
              </p>
              <h2 className="text-[#FDE5EC] font-bold">Nguyệt x Kha</h2>
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
