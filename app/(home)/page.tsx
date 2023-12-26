// import XmasTheme from "@/components/xmas-theme";

import Background from "@/components/background";
import CountDays from "@/components/count-days";

export default function Page() {
  return (
    <>
      <div className="z-50 flex overflow-hidden place-items-center min-h-screen m-0 justify-center items-center flex-col">
        {/* <XmasTheme /> */}
        <Background />
        <CountDays />
      </div>
    </>
  );
}
