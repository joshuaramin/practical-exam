import React from "react";
import Message from "../message";
import ButtonForm from "../form/button";
import ButtonGroup from "../form/buttonGroup";
import InputForm from "../form/input";
import Form from "../form/form";

export default function Login({
  onHandSubmitLogin,
  user,
  password,
  onUserChange,
  onPasswordChange,
  message,
}: any) {
  return (
    <div className="bg-gray-300 bg-opacity-50 absolute inset-0 flex items-center justify-center z-10">
      <Form
        onSubmit={onHandSubmitLogin}
        className="w-[500px] bg-white h-[450px] p-4 flex flex-col items-center rounded shadow-xl justify-center  gap-10 rounded"
      >
        <h2 className="text-center text-2xl">Login</h2>
        {message === "" ? null : <Message message={message} />}
        <InputForm
          type="text"
          placeholder="Username"
          className="w-full h-5 p-4 px-2 border-b-2 outline-none"
          value={user}
          onChange={onUserChange}
        />
        <InputForm
          type="password"
          placeholder="Password"
          className="w-full h-5 border-b-2 border-b p-4 px-2 outline-none"
          value={password}
          onChange={onPasswordChange}
        />
        <ButtonGroup className="w-full flex  items-center justify-center gap-1">
          <ButtonForm
            type="submit"
            className="w-full bg-black p-1 h-12 p-4 flex items-center justify-center rounded"
            name="Submit"
            textClassName="text-white"
          />
        </ButtonGroup>
      </Form>
    </div>
  );
}
