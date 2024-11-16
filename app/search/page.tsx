"use client";
import { Navbar } from "@/components/ui/navbar";
import { useRouter } from "next/navigation";


export default function SearchPage() {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    if (keyword === "") {

      return;
    }
  }

  return (
    <main className="flex flex-col items-center">
      <Navbar>
        <div className="flex justify-center items-center max-w-sm w-full p-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
                <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full border text-sm rounded-lg outline-none focus:ring-1 block w-full p-2.5 ps-10 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tìm kiếm"
              // value={keyword}
              onChange={handleChange}
              autoFocus
            ></input>
          </div>
        </div>
      </Navbar>
      <div className="max-w-sm w-full p-2">
        {/* <h2 className="font-semibold">Kết quả tìm kiếm</h2> */}


      </div>
    </main>
  );
}