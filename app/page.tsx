import CountDays from "@/components/CountDays";
import Background from "@/components/background";

export default function Home() {
  return (
    <>
      <div className="flex place-items-center min-h-screen m-0 justify-center items-center flex-col">
        <Background />
        <CountDays />
      </div>
    </>
  );
}
