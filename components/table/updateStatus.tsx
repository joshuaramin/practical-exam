import { status } from "@/util";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import Form from "../form/form";

export default function UpdateStatus({
  stats,
  close,
  id,
}: {
  stats: string;
  id: string;
  close: any;
}) {
  const [stat, setStatus] = useState(stats);

  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/updateTask`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        taskID: id,
        status: stat,
      }),
    });

    if (!response.ok) throw new Error("There something wrong while updating");

    window.location.reload();

    return response;
  };

  const onHandleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div className="w-[500px] h-[250px] shadow rounded-lg flex items-center p-2 bg-white">
      <Form
        onSubmit={onHandleSubmit}
        className="w-full flex flex-col gap-6 px-5"
      >
        <div>
          <h2 className="font-bold text-[20px]">
            Do you want to update this task status?
          </h2>
          <span>This action is permanent and cannot be undone.</span>
        </div>
        <select
          value={stat}
          onChange={onHandleSelectChange}
          className="w-full p-2"
        >
          {status.map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </select>
        <div className="w-full flex gap-1 items-center">
          <button
            type="submit"
            className="w-full bg-black text-white rounded h-[40px]"
          >
            OK
          </button>
          <button
            onClick={close}
            type="button"
            className="w-full bg-gray-300 text-black rounded h-[40px]"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
