import React, { FormEvent, useState } from "react";
import Form from "../form/form";
import { baseUrl } from "@/pages";
import { priority } from "@/util";
import { Flex, Text, Button, Dialog, Select } from "@radix-ui/themes";

export default function UpdatePriority({ id, prior }: any) {
  const [prio, setPrio] = useState(prior);
  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/api/updatePriority`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        taskID: id,
        priority: prio,
      }),
    });

    if (!response.ok) throw new Error("There something wrong while updating");

    window.location.reload();

    return response;
  };

  return (
    <Flex height="100%" align="center" justify="center">
      <Form onSubmit={onHandleSubmit}>
        <Flex direction="column" gapY="1">
          <Text as="span" size="5" weight="bold">
            Do you want to update this task priority?
          </Text>
          <Text as="span">This action is permanent and cannot be undone.</Text>
        </Flex>
        <Select.Root size="3" defaultValue={prio} onValueChange={setPrio}>
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
        <Flex width="100%" align="center" gapX="1">
          <Button
            size="3"
            style={{ width: "350px", height: "50px" }}
            type="submit"
          >
            <Text as="span" size="4">
              OK
            </Text>
          </Button>
          <Dialog.Close>
            <Button
              style={{ width: "350px", height: "50px" }}
              size="3"
              type="button"
              color="gray"
              variant="solid"
            >
              <Text as="span" size="4">
                Cancel
              </Text>
            </Button>
          </Dialog.Close>
        </Flex>
      </Form>
    </Flex>
  );
}
