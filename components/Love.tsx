"use client";
import { useEffect, useState } from "react";
const Love = () => {
  const [love, setLove] = useState(0);

  useEffect(() => {
    fetch("/api/love")
      .then((res) => res.json())
      .then((data) => {
        setLove(data);
      });
  }, []);

  const handleClick = () => {
    fetch("/api/love", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        love: love + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLove(data);
      });
  };

  return (
    <div>
      <div>{love}</div>
      <button
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleClick}
      ></button>
    </div>
  );
};

export default Love;
