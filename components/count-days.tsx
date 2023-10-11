"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Moon from "./Moon";
import localFont from "next/font/local";
import AstronautBoy from "./astronaut-boy";
import AstronautGirl from "./astronaut-girl";

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
      <div className="flex flex-col justify-center">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center"
        >
          <Moon />
          <div className="z-10 absolute pointer-events-none flex flex-col animate-textdelay items-center">
            <h2
              className={`font-medium flex items-center text[#9A3B3B] text-5xl z-10 ${bohemeFloral.className}`}
            >
              Nguyệt
              <p className="mx-2">x</p> Kha
            </h2>

            <div
              className={`flex items-end font-bold text-[#c891ff] box-border ${chloeBold.className}`}
            >
              <span className="text-7xl">{day}days</span>
            </div>
          </div>
        </button>
        <div className="relative ">
          <div className="absolute -bottom-[58px] left-[120px] animate-astrogirl">
            <AstronautGirl />
          </div>
          <div className="absolute -bottom-[140px] left-[40px] animate-astroboy">
            <AstronautBoy />
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDays;
