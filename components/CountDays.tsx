"use client";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Heart from "./Heart";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const housttely = localFont({
  src: [{ path: "./fonts/SVN-Housttely Signature.otf" }],
  display: "swap",
});

const habitat = localFont({
  src: "./fonts/DFVN MBF Space Habitat Regular.otf",
});

const CountDays = () => {
  const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  // const [love, setLove] = useState(0);

  const loveDay = "July, 27, 2023";

  // useEffect(() => {
  //   fetch("/api/love")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       fetch("/api/love", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           love: data + 1,
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setLove(data);
  //         });
  //     });
  // }, []);

  // const handleClick = () => {
  //   fetch("/api/love")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       fetch("/api/love", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           love: data + 1,
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setLove(data);
  //         });
  //     });
  // };

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
            // onClick={handleClick}
          >
            <Heart />
            <div className="z-10 absolute mb-10 flex flex-col items-center">
              <h2
                className={`text-[#A084E8] flex items-center text-2xl z-10 ${housttely.className}`}
              >
                Nguyệt
                <p className="text-[#8BE8E5] mx-2">X</p> Kha
              </h2>

              <div
                className={`text-4xl font-bold text-[#A084E8] ${habitat.className}`}
              >
                <span className="text-[#8BE8E5]">{days}</span> ngày
              </div>
              {/* <p className="text-[#BB2525] mt-3 font-bold px-4 bg-white rounded-full">
                Thương x{love} lần
              </p> */}
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
