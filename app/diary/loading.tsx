import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="fixed w-full h-full top-14 left-0 flex justify-center items-center">
      <Spinner height={32} width={32} fill="#2563eb" />
    </div>
  );
};

export default Loading;
