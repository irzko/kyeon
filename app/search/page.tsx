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
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full border text-sm rounded-lg outline-none focus:ring-1 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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