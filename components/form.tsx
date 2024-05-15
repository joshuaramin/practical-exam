import React, { useState, FormEvent, ChangeEvent } from "react";
import { TbPlus, TbX } from "react-icons/tb";
import { CreateTodoList, User } from "@/interface";
import { priority, status, tags } from "@/util/index";
import Form from "./form/form";
import AssignUsers from "./assignusers";
import InputForm from "./form/input";
import TextareaForm from "./form/textarea";
import ButtonGroup from "./form/buttonGroup";
import Message from "./message";
import { FormField } from "@radix-ui/react-form";
import { Box, Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";

export default function Forms({ userID }: any) {
  const [assign, setAssigned] = useState(false);
  const [message, setMessage] = useState("");

  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const [valueTags, setValueTags] = useState("");
  const [valueStatus, setValuesStatus] = useState("");
  const [valuePriority, setValuePriority] = useState("");

  let [users, setUsers] = useState<User[]>([]);

  const onHandleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        priority: valuePriority,
        status: valueStatus,
        tags: valueTags,
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
        description: "",
      });

      setUsers([]);

      window.location.reload();
    }

    return result;
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

  const onHandleFitlerUser = (e: any) => {
    setUsers(users.filter((user) => user.id !== e.target.value));
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      position="absolute"
      className=" bg-white w-full h-dhv absolute inset-0 p-0 bg-opacity-50 flex items-center relaive justify-center border-2 z-10"
    >
      <Form onSubmit={onHandleSubmitForm}>
        <Box className="w-full">
          <Text className="text-xl">Create New ToDo List</Text>
        </Box>
        {message === "" ? null : <Message message={message} />}
        <FormField name="Title">
          <InputForm
            className="w-full w-2/3  focus:border-black h-10 p-2 h-[50px] rounded-sm  rounded border border-gray-300 outline-none"
            placeholder="Title"
            type="text"
            onChange={onHandleInputTitle}
            value={todo.title}
          />
        </FormField>
        <FormField name="textarea">
          <TextareaForm
            value={todo.description}
            placeholder="Description"
            className="h-60 w-full focus:border-black block  outline-none resize-none p-2 text-sm rounded border-gray-300 border"
            onChange={onHandleTextarea}
          />
        </FormField>

        <Flex direction="column">
          <Text as="label">Assign</Text>
          <Flex
            justify="between"
            align="center"
            gapY="2"
            height="100px"
            width="100%"
          >
            <Flex align="center" gapX="2" overflowX="auto" p="2">
              {!users
                ? null
                : users.map(
                    ({ id, username }: { id: string; username: string }) => (
                      <Flex
                        key={id}
                        width="100%"
                        p="2"
                        align="center"
                        justify="center"
                        position="relative"
                        style={{ background: "#ccc", borderRadius: "100px" }}
                      >
                        <Button
                          type="button"
                          size="1"
                          radius="full"
                          onClick={onHandleFitlerUser}
                          style={{
                            position: "absolute",
                            top: "-5px",
                            width: "25px",
                            height: "25px",
                            right: "-5px",
                          }}
                          // className="absolute right-[-5px] top-[-5px] bg-gray-400 rounded-full w-[25px] h-[25px] flex items-center justify-center"
                        ></Button>
                        <Text className="text-sm">{username}</Text>
                      </Flex>
                    )
                  )}
            </Flex>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button
                  type="button"
                  onClick={onHandleAssignToggle}
                  style={{
                    width: "90px",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#000",
                    gap: "1",
                  }}
                >
                  <TbPlus size={20} />
                  <Text as="span" size="3">
                    Add
                  </Text>
                </Button>
              </Dialog.Trigger>
              <Dialog.Content style={{ height: "500px" }}>
                <AssignUsers
                  user={users}
                  setUsers={setUsers}
                  close={onHandleAssignToggle}
                />
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </Flex>

        <Flex direction="column" gapY="2">
          <Text as="span">Tags</Text>
          <Select.Root value={valueTags} onValueChange={setValueTags}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Tags</Select.Label>
                {tags.map(({ name, value }) => (
                  <Select.Item key={name} value={value}>
                    {name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction="column" gapY="2">
          <Text as="span">Status</Text>
          <Select.Root value={valueStatus} onValueChange={setValuesStatus}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Status</Select.Label>
                {status.map(({ name, value }) => (
                  <Select.Item key={name} value={value}>
                    {name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction="column" gapY="2">
          <Text as="span">Priority</Text>
          <Select.Root value={valuePriority} onValueChange={setValuePriority}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Priority</Select.Label>
                {priority.map(({ name, value }) => (
                  <Select.Item key={name} value={value}>
                    {name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <ButtonGroup>
          <Dialog.Close>
            <Button
              name="Cancel"
              type="button"
              style={{ width: "350px", height: "50px", background: "#000" }}
              className="bg-black w-full h-[50px] rounded"
            >
              <Text as="span" size="3">
                Cancel
              </Text>
            </Button>
          </Dialog.Close>
          <Button
            name="Submit"
            type="submit"
            style={{ width: "350px", height: "50px", background: "#000" }}
            className="bg-black w-full h-[50px] rounded"
          >
            <Text as="span" size="3">
              Submit
            </Text>
          </Button>
        </ButtonGroup>
      </Form>
    </Flex>
  );
}
