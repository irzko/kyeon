import React from "react";
import SnowmanBoy from "./xmas/snowman-boy";
import SnowmanGirl from "./xmas/snowman-girl";
import Snow from "./snow/snow";
import Background from "./xmas/background";

export default function XmasTheme() {
  return (
    <div>
      <div className="h-screen relative w-screen overflow-hidden bg-[#c0e4f4]">
        <div className="fixed flex justify-center items-center inset-0">
          <div className="relative">
            <Background />
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
