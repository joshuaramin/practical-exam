import { Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function ButtonGroup({ children }: Props) {
  return (
    <Flex
      width="100%"
      height="100px"
      gapX="4"
      justify={"center"}
      align="center"
    >
      {children}
    </Flex>
  );
}
