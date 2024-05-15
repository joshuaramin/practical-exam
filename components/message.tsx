import { Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  message?: string;
}

export default function Message({ message }: Props) {
  return (
    <Flex
      height="35px"
      style={{ borderRadius: "5px" }}
      p="2"
      width="100%"
      align="center"
    >
      <Text color="crimson" as="span">
        {message}
      </Text>
    </Flex>
  );
}
