import { Button, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  onClick?: () => void;
  className: string;
  textClassName: string;
  name: string;
  type?: "submit" | "button";
}
export default function ButtonForm({
  onClick,
  type,
  className,
  textClassName,
  name,
}: Props) {
  return (
    <Button
      style={{ width: "100%", height: "45px", background: "#000 " }}
      type={type}
      onClick={onClick}
    >
      <Text as="span" className={textClassName}>
        {name}
      </Text>
    </Button>
  );
}
