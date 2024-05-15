import React, { SyntheticEvent, useEffect, useState } from "react";
import Cookie from "js-cookie";
import Login from "./auth/login";
import Auth from "@/pages/_auth";
import { baseUrl } from "@/pages";
import { TbUserCircle } from "react-icons/tb";
import { GetUserData } from "@/interface";
import { Flex, Button, Box, Text } from "@radix-ui/themes";

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
    <Flex justify="between" align="center" width="100%">
      <Flex direction="column" gapY="2">
        <h2 className="text-2xl font-bold">
          Welcome Back{uname?.username ? ` ${uname?.username}` : ""}!
        </h2>
        <span className="font-light text-lg">Here is your ToDo List</span>
      </Flex>
      <Flex align="center" gapX="2">
        {token ? (
          <Flex position="relative">
            <Button
              onClick={onHandleToggle}
              color="gray"
              variant="soft"
              size="3"
              radius="small"
              style={{ border: "none", background: "transparent" }}
            >
              <TbUserCircle size={40} style={{ strokeWidth: "1.5px" }} />
            </Button>
            {toggle ? (
              <Flex
                direction="column"
                top="8"
                position="absolute"
                width="180px"
                style={{
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                p="3"
                right="0"
                gapY="2"
              >
                <Flex direction="column" gapY="22">
                  <Text as="span">{uname?.username}</Text>
                  <Text as="span">{uname?.role.toUpperCase()}</Text>
                </Flex>
                <Button onClick={onHandleLogout} color="crimson" variant="soft">
                  <Text as="span">Logout</Text>
                </Button>
              </Flex>
            ) : null}
          </Flex>
        ) : null}
      </Flex>

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
    </Flex>
  );
}
