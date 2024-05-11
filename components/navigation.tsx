import React, { useState } from "react";
import { TbCirclePlus } from "react-icons/tb";
import Forms from "./form";

export default function Navigation({ userID }: any) {
  const [add, setAdd] = useState(false);

  const onHandleAdd = () => {
    setAdd(() => !add);
  };

  return (
    <div className="w-full flex items-center justify-end">
      <div>
        <button
          onClick={onHandleAdd}
          className="flex items-center gap-2 hover:bg-black hover:text-white p-2 rounded border-2 border-black justify-center"
        >
          <TbCirclePlus size={25} style={{ strokeWidth: "1.5px" }} />
          <span className="text-xl">Add</span>
        </button>
        {add ? <Forms close={onHandleAdd} userID={userID} /> : null}
      </div>
    </div>
  );
}
