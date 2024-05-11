import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "700",
  display: "auto",
  subsets: ["latin"],
});

export default function TableHeaders() {
  return (
    <div className="w-full flex items-center items-center border-2 border-black px-0.5 h-[60px] bg-black text-white">
      <div className="w-[200px]  border-black px-0.5  flex items-center gap-3 h-[40px]">
        <span className={poppins.className}>TASK</span>
      </div>
      <div className="w-[500px] border-black px-0.5   h-[40px] flex items-center">
        <h2 className={poppins.className}>TITLE</h2>
      </div>
      <div className="w-[500px]  border-black px-0.5  h-[40px] flex items-center">
        <h2 className={poppins.className}>ASSIGN</h2>
      </div>
      <div className="w-[500px]  border-black px-0.5  h-[40px] flex items-center">
        <h2 className={poppins.className}>TAGS</h2>
      </div>
      <div className="w-[500px]  border-black px-0.5  h-[40px] flex items-center">
        <h2 className={poppins.className}>STATUS</h2>
      </div>
      <div className="w-[500px]  border-black px-0.5  h-[40px] flex items-center">
        <h2 className={poppins.className}>PRIORITY</h2>
      </div>
      <div className="w-[250px] border-black px-0.5  h-[40px] flex items-center">
        <h2></h2>
      </div>
    </div>
  );
}
