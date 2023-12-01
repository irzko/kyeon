"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Moon from "./Moon";
import localFont from "next/font/local";
import AstronautBoy from "./astronaut-boy";
import AstronautGirl from "./astronaut-girl";

const Heart = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 324.02 297.6"
        className="h-4 w-4 animate-heartbeats"
      >
        <title>Asset 1</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              className="fill-red-500"
              d="M298.86,82.3h0C274.1,42,220,35.29,179.72,60.05l-6.27,3.86-3.85-6.27C144.84,17.37,93.51-1,53.24,23.73h0A85.6,85.6,0,0,0,25.16,141.48L29,147.75l77.86,126.61a22.56,22.56,0,0,0,31,7.4l126.6-77.85,6.27-3.86A85.6,85.6,0,0,0,298.86,82.3Z"
            />
            <g className="opacity-[0.3]">
              <path
                className="fill-[#374151]"
                d="M298.86,82.3h0a75.85,75.85,0,0,0-10.78-13.73,85.61,85.61,0,0,1-39.72,86.3l-6.27,3.85L115.48,236.58a22.56,22.56,0,0,1-31-7.41L14.6,115.6a85.39,85.39,0,0,0,10.56,25.88L29,147.75l77.86,126.61a22.56,22.56,0,0,0,31,7.4l126.6-77.85,6.27-3.86A85.6,85.6,0,0,0,298.86,82.3Z"
              />
            </g>
            <g className="opacity-[0.7]">
              <path
                className="fill-[#fff]"
                d="M60.56,48.72h0c40.27-24.77,91.6-6.37,116.36,33.9l3.85,6.27L187,85c40.27-24.77,94.38-18,119.14,22.25h0a83.73,83.73,0,0,1,4.61,8.58A85.19,85.19,0,0,0,298.86,82.3h0C274.1,42,220,35.29,179.72,60.05l-6.27,3.86-3.85-6.27C144.84,17.37,93.51-1,53.24,23.73h0A85.59,85.59,0,0,0,20.55,132.9,85.57,85.57,0,0,1,60.56,48.72Z"
              />
            </g>
            <path
              className="fill-[#374151]"
              d="M126.15,297.6a35.09,35.09,0,0,1-29.93-16.69L14.51,148A98.2,98.2,0,0,1,46.69,13.09C68.87-.56,95.25-3.65,121,4.37a107.2,107.2,0,0,1,56.57,42.49,107.16,107.16,0,0,1,69.65-12.4c26.56,4.45,48.7,19.11,62.34,41.3h0A98.2,98.2,0,0,1,277.33,210.7L144.46,292.41A34.91,34.91,0,0,1,126.15,297.6ZM92.93,25a62.9,62.9,0,0,0-33.15,9.35,73.1,73.1,0,0,0-24,100.56l81.7,132.87a10.08,10.08,0,0,0,13.85,3.3l132.88-81.7a73.19,73.19,0,0,0,24-100.56c-9.8-15.94-25.84-26.5-45.17-29.73C224.09,56,203.4,60.17,186.27,70.7L180,74.55a12.51,12.51,0,0,1-17.2-4.1L159,64.19c-10.53-17.13-27.09-30.24-45.44-36A69.16,69.16,0,0,0,92.93,25Z"
            />
          </g>
        </g>
      </svg>
    </>
  );
};

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
      <div className="flex flex-col justify-center z-20">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center mb-14 items-center"
        >
          <Moon />
          <div className="z-10 absolute pointer-events-none mt-6 flex flex-col animate-textdelay items-center">
            <h2
              className={`font-medium flex items-center text-gray-600 uppercase text-xl z-10 ${fontName.className}`}
            >
              Nguyệt
              <p className={`mx-2 lowercase`}>&</p> Kha
            </h2>
            <p className={`text-gray-600 text-lg ${fontTitle.className}`}>
              đã ở trên vũ trụ
            </p>

            <div
              className={`flex text-3xl items-end font-bold text-blue-300 box-border uppercase ${fontDay.className}`}
            >
              {days}
              <span className="ml-2">days</span>
            </div>
          </div>
        </button>
        <div className="relative animate-flo">
          <div className="absolute left-[113px] -top-[100px] animate-heart opacity-100 -rotate-[35deg]">
            <Heart />
          </div>
          <div className="absolute bottom-[40px] left-[130px] animate-astrogirl">
            <AstronautGirl />
          </div>
          <div className="absolute -bottom-[42px] left-[50px] animate-astroboy">
            <AstronautBoy />
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDays;
