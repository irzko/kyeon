import CountDays from "@/components/CountDays";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex place-items-center min-h-screen m-0 justify-center items-center flex-col">
        <CountDays />
      </div>
    </>
  );
}
