import React, { useState } from "react";
import {
  TbDots,
  TbProgress,
  TbProgressAlert,
  TbProgressCheck,
  TbProgressDown,
  TbArrowBackUp,
  TbChevronUp,
  TbChevronDown,
  TbEqual,
  TbTrash,
  TbHammer,
} from "react-icons/tb";
import ToggleContainer from "../../toggleContainer";
import View from "../../view";
import DeleteTask from "../../deleteTask";
import UpdateStatus from "../../updateStatus";
import UpdatePriority from "../../updatePriority";

export default function TableRow({
  id,
  title,
  status,
  tags,
  priority,
  assign,
  description,
  taskID,
}: any) {
  const [toggle, setToggle] = useState(false);
  const [viewToggle, setViewToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updatePriority, setUpdatePriority] = useState(false);

  const onHandleToggle = () => {
    setToggle(() => !toggle);
  };

  const onHandleViewToggle = () => {
    setViewToggle(() => !viewToggle);
    setToggle(false);
  };

  const onHandleUpdateTask = () => {
    setUpdateStatus(() => !updateStatus);
    setToggle(false);
  };

  const onHandleDeleteToggle = () => {
    setDeleteToggle(() => !deleteToggle);
    setToggle(false);
  };

  const onHandleUpdatePriority = () => {
    setUpdatePriority(() => !updatePriority);
    setToggle(false);
  };
  return (
    <div className="w-full flex items-center justifyc-center  border-b-2 border-black">
      {viewToggle ? (
        <ToggleContainer>
          <View
            assign={assign}
            title={title}
            prio={priority}
            tags={tags}
            close={onHandleViewToggle}
            stats={status}
            description={description}
          />
        </ToggleContainer>
      ) : null}
      {deleteToggle ? (
        <ToggleContainer>
          <DeleteTask id={taskID} title={title} close={onHandleDeleteToggle} />
        </ToggleContainer>
      ) : null}
      {updateStatus ? (
        <ToggleContainer>
          <UpdateStatus id={taskID} stats={status} close={onHandleUpdateTask} />
        </ToggleContainer>
      ) : null}

      {updatePriority ? (
        <ToggleContainer>
          <UpdatePriority
            id={taskID}
            prior={priority}
            close={onHandleUpdatePriority}
          />
        </ToggleContainer>
      ) : null}
      <div className="w-[200px] border-black  h-[60px] px-0.5 flex items-center gap-2">
        <span>{id}</span>
      </div>
      <div className="w-[500px] border-black  h-[60px] px-0.5 flex items-center">
        <span>{title}</span>
      </div>
      <div className="w-[500px] border-black  h-[60px] px-0.5 flex items-center gap-1">
        {assign.User.map(
          ({ username, userID }: { username: string; userID: string }) => (
            <div className="relative" key={userID}>
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ">
                <div className="p-1 select-none">
                  {username[0].toUpperCase()}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="w-[500px] h-[60px] border-black  px-0.5 flex items-center">
        <span>{tags}</span>
      </div>
      <div className="w-[500px] h-[60px] border-black  px-0.5 flex items-center">
        {status === "InProgress" ? (
          <div className="flex items-center gap-2">
            <TbProgress size={23} />
            <span>In Progress</span>
          </div>
        ) : null}
        {status === "Doing" ? (
          <div className="flex items-center gap-2">
            <TbHammer size={23} />
            <span>Doing</span>
          </div>
        ) : null}
        {status === "Complete" ? (
          <div className="flex items-center gap-2">
            <TbProgressCheck size={23} />
            <span>Complete</span>
          </div>
        ) : null}
        {status === "Canceled" ? (
          <div className="flex items-center gap-2">
            <TbProgressAlert size={23} />
            <span>Canceled</span>
          </div>
        ) : null}
        {status === "Incomplete" ? (
          <div className="flex items-center gap-2">
            <TbProgressDown size={23} />
            <span>Incomplete</span>
          </div>
        ) : null}
        {status === "Backlog" ? (
          <div className="flex items-center gap-2">
            <TbArrowBackUp size={23} />
            <span>Backlog</span>
          </div>
        ) : null}
      </div>
      <div className="w-[500px] h-[60px] border-black  px-0.5 flex items-center">
        {priority === "High" ? (
          <div className="flex items-center gap-2">
            <TbChevronUp size={20} />
            <span>High</span>
          </div>
        ) : null}
        {priority === "Low" ? (
          <div className="flex items-center gap-2">
            <TbChevronDown size={20} />
            <span>Low</span>
          </div>
        ) : null}
        {priority === "Medium" ? (
          <div className="flex items-center gap-2">
            <TbEqual size={20} />
            <span>Medium</span>
          </div>
        ) : null}
      </div>
      <div className="w-[250px] h-[60px] border-black  px-0.5 flex items-center justify-center relative">
        <button
          onClick={onHandleToggle}
          className="hover:bg-black hover:text-white p-1 rounded-full"
        >
          <TbDots size={20} />
        </button>
        {toggle ? (
          <div className="w-[150px] h-[auto] shadow-xl border-2 rounded bg-white flex flex-col items-center justify-center absolute top-[50px] right-0 z-10">
            <button
              onClick={onHandleViewToggle}
              className="w-full p-2  hover:bg-black hover:text-white rounded"
            >
              View
            </button>
            <button
              onClick={onHandleUpdateTask}
              className="w-full p-2  hover:bg-black hover:text-white rounded"
            >
              Update Task
            </button>
            <button
              onClick={onHandleUpdatePriority}
              className="w-full p-2  hover:bg-black hover:text-white rounded"
            >
              Update Priority
            </button>
            <button
              onClick={onHandleDeleteToggle}
              className="w-full hover:bg-red-500 p-2 rounded hover:text-white flex items-center justify-center gap-2"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
