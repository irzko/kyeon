import CountDays from "@/components/count-days";
import Background from "@/components/background";


const loveDate = "July, 27, 2023";
const getTime = () => {
  const time = Date.now() - Date.parse(loveDate);
  return Math.floor(time / (1000 * 60 * 60 * 24));
};

export default function Page() {
  return (
    <>
      <div className="flex overflow-hidden place-items-center min-h-screen m-0 justify-center items-center flex-col">
        <Background />
        <CountDays day={getTime()} />
      </div>
    </>
  );
}
