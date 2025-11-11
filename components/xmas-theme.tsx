"use client";
import { useEffect, useState } from "react";
import SnowmanBoy from "./xmas/snowman-boy";
import SnowmanGirl from "./xmas/snowman-girl";
import Snow from "./snow/snow";
import Background from "./xmas/background";
import localFont from "next/font/local";
import Sun from "./xmas/sun";
import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";

const fontDay = localFont({
  src: "./fonts/Christmas.otf",
});

export default function XmasTheme() {
  const loveDate = "July, 27, 2023";
  const [touch, setTouch] = useState(0);
  const [days, setDays] = useState(0);
  const router = useRouter();

  const handleClick = () => {
    const count = touch + 1;
    if (count === 3) {
      router.push("/diary");
    } else {
      setTouch(touch + 1);
    }
  };

  useEffect(() => {
    const getTime = () => {
      const time = Date.now() - Date.parse(loveDate);
      return Math.floor(time / (1000 * 60 * 60 * 24));
    };
    setDays(getTime());
  }, []);

  return (
    <div>
      <Box h="vh" position="relative" overflow="hidden">
        <Box
          position="fixed"
          display="flex"
          justifyContent="center"
          alignItems="center"
          inset="0"
        >
          <Box position="relative">
            <Background />
            <Box position="relative" top="-32" left="-40">
              <Sun />
            </Box>
            <Box
              onClick={handleClick}
              display="flex"
              position="absolute"
              top="12"
              left="24"
              fontSize="6xl"
              alignItems="end"
              rotate="-12"
              fontWeight="bold"
              boxSizing="border-box"
              className={`${fontDay.className}`}
            >
              {days}
              <Box ml="2">days</Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              position="absolute"
              bottom="-14"
              right="10"
            >
              <SnowmanBoy />
              <SnowmanGirl />
            </Box>
          </Box>
        </Box>
        <Snow />
      </Box>
    </div>
  );
}
