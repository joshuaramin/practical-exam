import { Flex, Text } from "@radix-ui/themes";
import React from "react";

export default function IconText({
  text,
  icon,
  color,
}: {
  text: string;
  icon: any;
  color: string;
}) {
  return (
    <Flex align="center" gapX="1">
      {icon}
      <Text style={{ color: `#${color}` }}>{text}</Text>
    </Flex>
  );
}
