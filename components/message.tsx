import React from "react";

interface Props {
  message?: string;
}

export default function Message({ message }: Props) {
  return (
    <div className="w-full bg-red-500 p-2 h-[60px] flex items-center rounded">
      <span className="text-white text-lg">{message}</span>
    </div>
  );
}
