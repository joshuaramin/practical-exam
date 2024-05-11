import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { TbX } from "react-icons/tb";

export default function View({
  assign,
  tags,
  title,
  prio,
  close,
  stats,
  description,
}: any) {
  return (
    <div className="w-[1200px] h-[800px] rounded-lg p-3 bg-white shadow-lg">
      <div className="w-full h-[65px] p-2 flex items-center justify-end border-b-2">
        <button className="hover:bg-gray-200 p-2 rounded-full" onClick={close}>
          <TbX size={20} />
        </button>
      </div>
      <div className="w-full flex py-[20px]">
        <div className="w-full flex flex-col gap-5 ">
          <h2 className="text-[30px] h-40px font-bold py-[20px]">{title}</h2>
          <div>
            <span>Tags: {tags}</span>
          </div>
          <div className="w-full flex gap-2">
            <span>Status: {stats} </span>
          </div>
          <div className="w-full flex gap-2">
            <span>Priority: {prio} </span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-bold">Description</h2>
            <span className="text-sm">{description}</span>
          </div>
        </div>
        <div className="w-[500px]  flex flex-col gap-2 border-l-2 p-2">
          <h2>Assigned Users</h2>
          {assign.User.map(
            ({ username, userID }: { username: string; userID: string }) => (
              <div key={userID} className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex items-center justify-center">
                  <Image src="/noimage.jpg" alt="" height={20} width={30} />
                </div>
                <h2>{username}</h2>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
