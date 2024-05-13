import React, { SyntheticEvent, useEffect, useState } from "react";
import Cookie from "js-cookie";
import Login from "./auth/login";
import Auth from "@/pages/_auth";
import { baseUrl } from "@/pages";
import { TbUserCircle } from "react-icons/tb";
import { GetUserData } from "@/interface";

export default function Header() {
  const token = Auth();

  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const [uname, setUsername] = useState<GetUserData>();
  const [users, setUsers] = useState({
    username: "",
    password: "",
  });
  const onHandleToggle = () => {
    setToggle(() => !toggle);
  };

  const onHandleSubmitLogin = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: users.username,
        password: users.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message);
    } else {
      Cookie.set("access_token", result);

      window.location.reload();

      return result;
    }
  };

  const onHandleUserChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setUsers({ ...users, username: e.currentTarget.value });
  };

  const onHandlePasswordChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setUsers({ ...users, password: e.currentTarget.value });
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchData = async () => {
      const response = await fetch(`/api/getMyUsername?id=${token}`, {
        method: "GET",
      });

      const result = await response.json();
      setUsername(result);
    };
    fetchData();
  }, [token]);

  const onHandleLogout = () => {
    Cookie.remove("access_token");
    window.location.reload();
  };
  return (
    <div className="w-100 h-28  flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          Welcome Back{uname?.username ? ` ${uname?.username}` : ""}!
        </h2>
        <span className="font-light text-lg">Here is your ToDo List</span>
      </div>
      <div className="flex items-center gap-2">
        {token ? (
          <div className="flex relative">
            <button onClick={onHandleToggle}>
              <TbUserCircle size={40} style={{ strokeWidth: "1.5px" }} />
            </button>
            {toggle ? (
              <div className="bg-white p-2 shadow-xl w-[180px] rounded absolute py-4 flex flex-col gap-2 right-0 top-10">
                <div className="px-1 py-2  w-full border-b-2 flex  flex-col justify-start">
                  <span className="">{uname?.username}</span>
                  <span className="text-[13px]">
                    {uname?.role.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={onHandleLogout}
                  className="hover:bg-red-500 hover:text-white h-[40px] w-full gap-2  px-2 rounded-[5px] flex items-center justify-start rounded"
                >
                  <span className="text-[16px] font-medium">Logout</span>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {token ? null : (
        <Login
          close={onHandleToggle}
          message={message}
          onHandSubmitLogin={onHandleSubmitLogin}
          user={users.username}
          password={users.password}
          onUserChange={onHandleUserChange}
          onPasswordChange={onHandlePasswordChange}
        />
      )}
    </div>
  );
}
