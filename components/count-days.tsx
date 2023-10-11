"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Moon from "./moon";
import localFont from "next/font/local";

const bohemeFloral = localFont({
  src: "./fonts/DFVN Boheme Floral.otf",
});

const chloeBold = localFont({
  src: "./fonts/KagePro-Normal.otf",
});

const CountDays = ({ day }: { day: number }) => {
  const [touch, setTouch] = useState(0);
  const router = useRouter();

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
      <div className="absolute">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center"
        >
          <Moon />
          <div className="z-10 absolute flex flex-col items-center">
            <h2
              className={`font-medium flex items-center text[#9A3B3B] text-5xl z-10 ${bohemeFloral.className}`}
            >
              Nguyệt
              <p className="mx-2">x</p> Kha
            </h2>

            <div
              className={`flex items-end font-bold text-[#FCBAAD] box-border ${chloeBold.className}`}
            >
              <span className="text-7xl">{day}days</span>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default CountDays;
