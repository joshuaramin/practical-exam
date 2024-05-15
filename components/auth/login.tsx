import React from "react";
import Message from "../message";
import ButtonForm from "../form/button";
import ButtonGroup from "../form/buttonGroup";
import InputForm from "../form/input";
import { Flex, Text } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

export default function Login({
  onHandSubmitLogin,
  user,
  password,
  onUserChange,
  onPasswordChange,
  message,
}: any) {
  return (
    <Flex
      style={{ backgroundColor: "gray" }}
      width="100%"
      position="absolute"
      inset="0"
      justify="center"
      align="center"
    >
      <Form.Root
        onSubmit={onHandSubmitLogin}
        className="w-[500px] bg-white h-[450px] p-4 flex flex-col items-center rounded shadow-xl justify-center  gap-10 rounded z-20"
      >
        <Text className="text-center text-2xl">Login</Text>
        {message === "" ? null : <Message message={message} />}

        <Form.FormField name="User" style={{ width: "100%" }}>
          <InputForm
            type="text"
            placeholder="Username"
            className="w-full h-5 border-b-2 border-b p-4 px-2 outline-none"
            value={user}
            onChange={onUserChange}
          />
        </Form.FormField>

        <Form.FormField name="Pasword" style={{ width: "100%" }}>
          <InputForm
            type="password"
            placeholder="Password"
            className="w-full h-5 border-b-2 border-b p-4 px-2 outline-none"
            value={password}
            onChange={onPasswordChange}
          />
        </Form.FormField>
        <ButtonGroup>
          <ButtonForm
            type="submit"
            className="w-full bg-black p-1 h-12 p-4 flex items-center justify-center rounded"
            name="Submit"
            textClassName="text-white"
          />
        </ButtonGroup>
      </Form.Root>
    </Flex>
  );
}
