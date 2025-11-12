"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Moon from "./Moon";
import localFont from "next/font/local";
import AstronautBoy from "./astronaut-boy";
import AstronautGirl from "./astronaut-girl";
import { motion } from "motion/react";
import { differenceInDays } from "date-fns";

// Chakra UI motion components
const MotionButton = motion.create(Button);
const MotionBox = motion.create(Box);

const Heart = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 324.02 297.6"
      className="h-4 w-4"
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

const DaysCounterButton = () => {
  const [touch, setTouch] = useState(0);
  const router = useRouter();
  const [days, setDays] = useState(0);

  useEffect(() => {
    setDays(differenceInDays(new Date(), "2023-07-27"));
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
    <MotionBox
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mb="56px"
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      _hover={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
    >
      <Moon />
      <MotionBox
        position="absolute"
        pointerEvents="none"
        mt="24px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.75, 1] }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          times: [0, 0.5, 0.8, 1],
        }}
      >
        <Text
          className={fontName.className}
          fontWeight="medium"
          display="flex"
          alignItems="center"
          color="gray.600"
          textTransform="uppercase"
          fontSize="xl"
        >
          Nguyệt
          <Text as="span" mx="2" textTransform="lowercase">
            &
          </Text>
          Kha
        </Text>
        <Text className={fontTitle.className} color="gray.600" fontSize="lg">
          đã ở trên vũ trụ
        </Text>

        <Flex
          className={fontDay.className}
          fontSize="3xl"
          alignItems="flex-end"
          fontWeight="bold"
          color="blue.300"
          textTransform="uppercase"
        >
          {days}
          <Text as="span" ml="2">
            days
          </Text>
        </Flex>
      </MotionBox>
    </MotionBox>
  );
};

const CountDaysPage = () => {
  return (
    <Flex flexDirection="column" justifyContent="center">
      <DaysCounterButton />
      <MotionBox
        position="relative"
        initial={{ transform: "translateY(0px) rotate(0deg)" }}
        animate={{ transform: "translateY(-10px) rotate(5deg)" }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
      >
        <MotionBox
          position="absolute"
          left="113px"
          top="-100px"
          initial={{ opacity: 0.75, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          opacity="1"
          transform="rotate(-35deg)"
        >
          <Heart />
        </MotionBox>
        <MotionBox
          position="absolute"
          bottom="40px"
          left="130px"
          initial={{ transform: "translateY(0px) rotate(0deg)" }}
          animate={{ transform: "translateY(-10px) rotate(5deg)" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <AstronautGirl />
        </MotionBox>
        <MotionBox
          position="absolute"
          bottom="-42px"
          left="50px"
          initial={{ transform: "translateY(0px) rotate(0deg)" }}
          animate={{ transform: "translateY(-10px) rotate(5deg)" }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <AstronautBoy />
        </MotionBox>
      </MotionBox>
    </Flex>
  );
};

export default CountDaysPage;
