import Spinner from "@/components/Spinner";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center">
      <Spinner className="w-10 h-10" />
    </div>
  );
};

export default LoadingScreen;
