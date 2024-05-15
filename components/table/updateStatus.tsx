import { status } from "@/util";
import React, { FormEvent, useState } from "react";
import Form from "../form/form";
import { Button, Dialog, Flex, Text, Select } from "@radix-ui/themes";

export default function UpdateStatus({
  stats,
  id,
}: {
  stats: string;
  id: string;
}) {
  const [stat, setStatus] = useState(stats);

  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/updateTask`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        taskID: id,
        status: stat,
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
          <Text as="span" size="4" weight="bold">
            Do you want to update this task status?
          </Text>
          <Text as="span">This action is permanent and cannot be undone.</Text>
        </Flex>
        <Flex direction="column" gapY="2">
          <Text as="span">Status</Text>

          <Select.Root defaultValue={stat} onValueChange={setStatus} size="3">
            <Select.Trigger />

            <Select.Content>
              {status.map(({ name, value }) => (
                <Select.Item key={name} value={value}>
                  {name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex
          width="100%"
          gapX="1"
          align="center"
          justify="center"
          height="70px"
        >
          <Button type="submit" style={{ width: "350px", height: "50px" }}>
            <Text as="span" size="5">
              OK
            </Text>
          </Button>
          <Dialog.Close>
            <Button
              type="button"
              color="gray"
              variant="solid"
              style={{ width: "350px", height: "50px" }}
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
