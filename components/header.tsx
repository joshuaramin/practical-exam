import React, { FormEvent, SyntheticEvent, useState } from "react";
import Cookie from "js-cookie";
import Login from "./auth/login";
import ButtonForm from "./form/button";
import Auth from "@/pages/_auth";
import { baseUrl } from "@/pages";
import { TbLogout, TbLogout2, TbUserCircle } from "react-icons/tb";

export default function Header() {
  const token = Auth();

  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");

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

  const onHandleLogout = () => {
    Cookie.remove("access_token");
    window.location.reload();
  };
  return (
    <div className="w-100 h-28  flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <span className="font-light text-lg">
          Here is your ToDo List for this month!
        </span>
      </div>
      <div className="flex items-center gap-2">
        {token ? (
          <button
            onClick={onHandleLogout}
            className="hover:bg-red-600  hover:text-white h-[50px] w-[120px] gap-2  p-1 rounded-[5px] flex items-center justify-center rounded"
          >
            <TbLogout2 size={20} style={{ strokeWidth: "1.5px" }} />
            <span className="text-ls font-medium">Logout</span>
          </button>
        ) : (
          <button>
            <TbUserCircle size={40} style={{ strokeWidth: "1.5px" }} />
          </button>
        )}
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
