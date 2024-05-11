import React, { FormEvent, useState } from "react";
import Form from "../form/form";
import { baseUrl } from "@/pages";
import { priority } from "@/util";

export default function UpdatePriority({ id, prior, close }: any) {
  const [prio, setPrio] = useState(prior);
  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/api/updatePriority`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        taskID: id,
        priority: prio,
      }),
    });

    if (!response.ok) throw new Error("There something wrong while updating");

    window.location.reload();

    return response;
  };

  const onHandleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    setPrio(e.currentTarget.value);
  };
  return (
    <div className="w-[500px] h-[230px] shadow rounded-lg flex items-center p-2 bg-white">
      <Form
        onSubmit={onHandleSubmit}
        className="w-full flex flex-col gap-6 px-5"
      >
        <div>
          <h2 className="font-bold text-[20px]">
            Do you want to delete this task?
          </h2>
          <span>This action is permanent and cannot be undone.</span>
        </div>
        <select
          value={prio}
          onChange={onHandleSelectChange}
          className="w-full p-2"
        >
          {priority.map(({ name, value }) => (
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
