import { baseUrl } from "@/pages";
import React, { useEffect, useState } from "react";
import { TbPlus, TbX } from "react-icons/tb";

export default function AssignUsers({ setUsers, user, close }: any) {
  const [users, setUser] = useState<any>();

  const onHandleAdd = (id: string, username: string) => {
    setUsers(() => [...user, { id, username }]);
  };

  const onHandleRemoveAssign = (e: any) => {
    setUsers(user.filter((name: any) => name.id !== e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/api/getUserEmployee`, {
        method: "GET",
      });

      const result = await response.json();

      setUser(result);
    };

    fetchData();
  }, []);

  if (!users || users.length === 0) return <p>There are no active users</p>;

  return (
    <div className="w-4/12 min-h-[400px] bg-gray-300 p-4 flex flex-col gap-4 justity-between bg-white z-10 rounded shadow">
      <div className="flex flex-col gap-5">
        <div className="w-full h-[75px] flex items-center justify-end">
          <button
            onClick={close}
            className="w-[40px] h-[40px] rounded-full hover:text-white flex  items-center justify-center hover:bg-black"
          >
            <TbX size={23} />
          </button>
        </div>
      </div>
      <div className="flex flex-col h-[250px] overflow-y-auto">
        {users.map(
          ({ username, userID }: { username: string; userID: string }) => (
            <div
              className="border-b-2 h-[60px]  flex items-center justify-between"
              key={userID}
            >
              <span>{username}</span>
              {user.find((a: any) => a.id === userID) ? (
                <button
                  onClick={onHandleRemoveAssign}
                  value={userID}
                  className="bg-red-500 text-white p-2 border-none rounded"
                >
                  Removed
                </button>
              ) : (
                <button
                  onClick={() => onHandleAdd(userID, username)}
                  value={username}
                  className="bg-black text-white rounded p-2 w-20 flex items-center justify-center"
                >
                  <span>Add</span>
                </button>
              )}
            </div>
          )
        )}
      </div>
      <div className="flex justify-end h-[200px] items-center">
        <button
          onClick={close}
          className="w-[80px] h-[40px] bg-black rounded text-white "
        >
          Done
        </button>
      </div>
    </div>
  );
}
