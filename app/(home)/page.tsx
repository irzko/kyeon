import CountDays from "@/components/count-days";
import Background from "@/components/background";




export default function Page() {
  return (
    <>
      <div className="flex overflow-hidden place-items-center min-h-screen m-0 justify-center items-center flex-col">
        <Background />
        <CountDays />
      </div>
    </>
  );
}
