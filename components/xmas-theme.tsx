"use client";
import React, { useEffect, useState } from "react";
import SnowmanBoy from "./xmas/snowman-boy";
import SnowmanGirl from "./xmas/snowman-girl";
import Snow from "./snow/snow";
import Background from "./xmas/background";
import localFont from "next/font/local";

const fontDay = localFont({
  src: "./fonts/Christmas.otf",
});

export default function XmasTheme() {
  const loveDate = "July, 27, 2023";
  const [days, setDays] = useState(0);

  useEffect(() => {
    const getTime = () => {
      const time = Date.now() - Date.parse(loveDate);
      return Math.floor(time / (1000 * 60 * 60 * 24));
    };
    setDays(getTime());
  }, []);

  return (
    <div>
      <div className="h-screen relative w-screen overflow-hidden count-day-bg">
        <div className="fixed flex justify-center items-center inset-0">
          <div className="relative">
            <Background />
            <div
              className={`flex absolute top-12 left-24 text-6xl items-end -rotate-12 font-bold text-white box-border ${fontDay.className}`}
            >
              {days}
              <span className="ml-2">days</span>
            </div>

            <div className="flex justify-center absolute -bottom-14 right-10">
              <SnowmanBoy />
              <SnowmanGirl />
            </div>
          </div>
        </div>
        <Snow />
      </div>
    </div>
  );
}
