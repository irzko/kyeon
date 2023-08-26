"use client";
import { useState, useEffect } from "react";
import Heart from "./Heart";
import LoadingDots from "./loading-dots";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";

const bohemeFloral = localFont({
  src: "./fonts/DFVN Boheme Floral.otf",
});

const chloeBold = localFont({
  src: "./fonts/KagePro-Normal.otf",
});

const CountDays = () => {
  const [days, setDays] = useState(0);
  const [touch, setTouch] = useState(0);
  const router = useRouter();

  const loveDate = "July, 27, 2023";

  const getTime = (loveDate: string) => {
    const time = Date.now() - Date.parse(loveDate);
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  };

  const handleClick = () => {
    const count = touch + 1;
    if (count === 3) {
      router.push("/diary");
    } else {
      setTouch(touch + 1);
    }
  };

  useEffect(() => {
    getTime(loveDate);
  }, []);

  return (
    <>
      <div className="absolute">
        {days ? (
          <div
            className="flex flex-col justify-center items-center"
            onClick={handleClick}
          >
            <Heart />
            <div className="z-10 absolute mb-10 flex flex-col items-center">
              <h2
                className={`font-medium flex items-center text[#9A3B3B] text-5xl z-10  ${bohemeFloral.className}`}
              >
                Nguyệt
                <p className="mx-2">x</p> Kha
              </h2>

              <div
                className={`flex items-end text-5xl font-bold text-[#FCBAAD] uppercase ${chloeBold.className}`}
              >
                <span className="text-7xl">{days}</span> Days
              </div>
            </div>
          </div>
        ) : (
          <LoadingDots />
        )}
      </div>
    </>
  );
};

export default CountDays;
