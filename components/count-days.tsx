"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Moon from "./Moon";
import localFont from "next/font/local";
import AstronautBoy from "./astronaut-boy";
import AstronautGirl from "./astronaut-girl";

const fontName = localFont({
  src: "./fonts/DFVN LazyFox.otf",
});

const fontDay = localFont({
  src: "./fonts/SweetBelly-Sans.otf",
});

const fontTitle = localFont({
  src: "./fonts/Pecita.otf",
});


const CountDays = () => {
  const loveDate = "July, 27, 2023";
  const [touch, setTouch] = useState(0);
  const router = useRouter();
  const [days, setDays] = useState(0);

  useEffect(() => {
    const getTime = () => {
      const time = Date.now() - Date.parse(loveDate);
      return Math.floor(time / (1000 * 60 * 60 * 24));
    };
    setDays(getTime());
  }, []);

  const handleClick = () => {
    const count = touch + 1;
    if (count === 3) {
      router.push("/diary");
    } else {
      setTouch(touch + 1);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center mb-14 items-center"
        >
          <Moon />
          <div className="z-10 absolute pointer-events-none flex flex-col animate-textdelay items-center">
            <h2
              className={`font-medium flex items-center text-gray-600 uppercase text-xl z-10 ${fontName.className}`}
            >
              Nguyệt
              <p className={`mx-2 lowercase`}>&</p> Kha
            </h2>
            <p className={`text-gray-600 text-lg ${fontTitle.className}`}>đã ở trên vũ trụ</p>

            <div
              className={`flex text-3xl items-end font-bold text-rose-400 box-border uppercase ${fontDay.className}`}
            >
              {days}
              <span className="ml-2">days</span>
            </div>
          </div>
        </button>
        <div className="relative ">
          <div className="absolute -bottom-[0px] left-[120px] animate-astrogirl">
            <AstronautGirl />
          </div>
          <div className="absolute -bottom-[82px] left-[40px] animate-astroboy">
            <AstronautBoy />
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDays;
