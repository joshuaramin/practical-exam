import React, { FormEvent } from "react";
import Form from "../form/form";
import { baseUrl } from "@/pages";
import ButtonGroup from "../form/buttonGroup";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";

export default function DeleteTask({ id }: { id: string }) {
  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/api/deleteTask`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskID: id }),
    });

    const result = response.json();

    if (!response.ok) {
      throw new Error("There something is wrong");
    } else {
      window.location.reload();
    }

    return result;
  };
  return (
    <Flex width="100%" justify="center" align="center" height="100%">
      <Form onSubmit={onHandleSubmit}>
        <Flex justify="center" direction="column" gapY="1">
          <Text as="span" size="5" weight="bold">
            Do you want to delete this task?
          </Text>
          <Text>This action is permanent and cannot be undone.</Text>
        </Flex>
        <ButtonGroup>
          <Button
            color="crimson"
            type="submit"
            style={{ width: "320px", height: "50px" }}
          >
            <Text as="span" size="4">
              OK
            </Text>
          </Button>
          <Dialog.Close>
            <Button type="button" style={{ width: "320px", height: "50px" }}>
              <Text as="span" size="4">
                Cancel
              </Text>
            </Button>
          </Dialog.Close>
        </ButtonGroup>
      </Form>
    </Flex>
  );
}
