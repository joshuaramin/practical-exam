import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { TbPlus, TbX } from "react-icons/tb";
import { CreateTodoList, User } from "@/interface";
import { priority, status, tags } from "@/util/index";
import Form from "./form/form";
import AssignUsers from "./assignusers";
import SelectForm from "./form/select";
import InputForm from "./form/input";
import TextareaForm from "./form/textarea";
import ButtonGroup from "./form/buttonGroup";
import ButtonForm from "./form/button";
import Message from "./message";

export default function Forms({ userID, close }: any) {
  const [assign, setAssigned] = useState(false);
  const [message, setMessage] = useState("");
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/getUserEmployee`, {
        method: "GET",
      });

      const result = await response.json();

      setEmployee(result);
    };

    fetchData();
  }, []);

  const [todo, setTodo] = useState<CreateTodoList>({
    title: "",
    description: "",
    priority: "",
    status: "",
    tags: "",
  });

  let [users, setUsers] = useState<User[]>([]);

  const onHandleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        status: todo.status,
        tags: todo.tags,
        userID: userID,
        users: users?.map(({ id }: { id: string }) => {
          return { userID: id };
        }),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      setMessage(result.message);
    } else {
      setTodo({
        title: "",
        priority: "Choose a Priority",
        status: "Choose a Status",
        description: "",
        tags: "",
      });

      setUsers([]);

      window.location.reload();
    }

    return result;
  };

  const onHandleSelectStatus = (e: FormEvent<HTMLSelectElement>) => {
    setTodo({ ...todo, status: e.currentTarget.value });
  };

  const onHandleSelectPriority = (e: FormEvent<HTMLSelectElement>) => {
    setTodo({ ...todo, priority: e.currentTarget.value });
  };

  const onHandleSelectTags = (e: FormEvent<HTMLSelectElement>) => {
    setTodo({ ...todo, tags: e.currentTarget.value });
  };

  const onHandleInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.currentTarget.value });
  };

  const onHandleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodo({ ...todo, description: e.currentTarget.value });
  };

  const onHandleAssignToggle = () => {
    setAssigned(() => !assign);
  };

  const onHandleRemoveAssign = (e: any) => {
    console.log(e.target.value);
    // setUsers(users.filter((name: any) => name.id !== e.target.value));
  };

  return (
    <div className="w-100 flex justify-end items-center bg-white absolute inset-0">
      <div className=" bg-white w-full h-dhv absolute inset-0 p-0 bg-opacity-50 flex items-center relaive justify-center border-2 z-10">
        {assign ? (
          <div className="absolute w-full bg-gray-100 bg-opacity-50 h-full flex items-center justify-center">
            <AssignUsers
              user={users}
              setUsers={setUsers}
              close={onHandleAssignToggle}
            />
          </div>
        ) : null}
        <Form
          onSubmit={onHandleSubmitForm}
          className="flex flex-col h-auto w-[900px] justify-center p-1 gap-3 text-sm gap-3 bg-white p-4"
        >
          <div className="w-full">
            <h2 className="text-xl">Create New ToDo List</h2>
          </div>
          {message === "" ? null : <Message message={message} />}
          <InputForm
            className="w-full w-2/3  focus:border-black h-10 p-2 h-[50px] rounded-sm  rounded border border-gray-300 outline-none"
            placeholder="Title"
            type="text"
            onChange={onHandleInputTitle}
            value={todo.title}
          />
          <TextareaForm
            value={todo.description}
            placeholder="Description"
            className="h-60 w-full focus:border-black block  outline-none resize-none p-2 text-sm rounded border-gray-300 border"
            onChange={onHandleTextarea}
          />

          <div className="w-full flex flex-col">
            <h2>Assign</h2>
            <div className="flex justify-between gap-2 w-full items-center h-[100px]">
              <div className="flex items-center border overflow-x-auto w-full p-2 border-0 gap-2">
                {!users
                  ? null
                  : users.map(
                      ({ id, username }: { id: string; username: string }) => (
                        <div
                          key={id}
                          className="bg-gray-300 w-auto p-3 h-10 flex items-center justify-center rounded-full relative"
                        >
                          <button
                            type="button"
                            onClick={(e) =>
                              setUsers(
                                users.filter(
                                  (name: any) =>
                                    name.id !== e.currentTarget.value
                                )
                              )
                            }
                            value={id}
                            className="absolute right-[-5px] top-[-5px] bg-gray-400 rounded-full w-[25px] h-[25px] flex items-center justify-center"
                          >
                            <TbX size={16} />
                          </button>
                          <span className="text-sm">{username}</span>
                        </div>
                      )
                    )}
              </div>
              <button
                type="button"
                onClick={onHandleAssignToggle}
                className="w-[100px] bg-black text-white rounded flex gap-1 items-center justify-center h-[50px]"
              >
                <TbPlus size={20} />
                <span className="text-lg">Add</span>
              </button>
            </div>
          </div>

          <SelectForm
            onClick={onHandleSelectTags}
            containerClassName="w-full flex flex-col gap-2"
            selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            title="Tag"
          >
            <option>Choose a Tag</option>
            {tags.map(({ name, value }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </SelectForm>

          <SelectForm
            onClick={onHandleSelectStatus}
            containerClassName="w-full flex flex-col gap-2"
            selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            title="Status"
          >
            <option>Choose a Status</option>
            {status.map(({ name, value }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </SelectForm>

          <SelectForm
            onClick={onHandleSelectPriority}
            containerClassName="w-full flex flex-col gap-2"
            selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            title="Priority"
          >
            <option>Choose a Priority</option>
            {priority.map(({ name, value }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </SelectForm>

          <ButtonGroup className="flex items-center justify-between w-full gap-2">
            <button
              type="button"
              className="bg-gray-200 w-full h-[50px] rounded"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black w-full h-[50px] rounded text-white  w-full h-[50px] rounded"
            >
              Submit
            </button>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
}
