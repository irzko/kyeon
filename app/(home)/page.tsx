// import XmasTheme from "@/components/xmas-theme";

import Background from "@/components/background";
import CountDays from "@/components/count-days";

export default function Page() {
  return (
    <>
      <div className="flex fixed overflow-hidden place-items-center inset-0 m-0 justify-center items-center flex-col">
        {/* <XmasTheme /> */}
        <Background />
        <CountDays />
      </div>
    </>
  );
}
