import React, { FormEvent } from "react";
import Form from "../form/form";
import { baseUrl } from "@/pages";

export default function DeleteTask({
  id,
  title,
  close,
}: {
  id: string;
  title: string;
  close: any;
}) {
  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/api/deleteTask`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskID: id }),
    });

    const result = response.json();

    if (!response.ok) {
      throw new Error("There something is wrong");
    } else {
      window.location.reload();
    }

    return result;
  };
  return (
    <div className="w-[500px] h-[230px] shadow rounded-lg flex items-center p-2 bg-white">
      <Form
        onSubmit={onHandleSubmit}
        className="w-full flex flex-col gap-6 px-5"
      >
        <div className="w-full flex flex-col gap-1">
          <h2 className="font-bold text-[20px]">
            Do you want to delete this task?
          </h2>
          <span>This action is permanent and cannot be undone.</span>
        </div>
        <div className="w-full flex gap-1 items-center">
          <button
            type="submit"
            className="w-full bg-red-500 text-white rounded h-[40px]"
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
