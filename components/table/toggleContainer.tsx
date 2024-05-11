import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ToggleContainer({ children }: Props) {
  return (
    <div className="w-full h-full absolute bg-gray-200 bg-opacity-75 inset-0 z-10 flex items-center justify-center">
      {children}
    </div>
  );
}
