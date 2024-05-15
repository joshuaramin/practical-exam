import { FormControl } from "@radix-ui/react-form";
import { TextArea } from "@radix-ui/themes";
import React, { ChangeEvent, TextareaHTMLAttributes } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  className: string;
}

export default function TextareaForm({
  value,
  onChange,
  placeholder,
  className,
}: Props) {
  return (
    <FormControl asChild>
      <TextArea
        value={value}
        onChange={onChange}
        size="3"
        variant="surface"
        placeholder={placeholder}
        radius="medium"
        style={{ height: "200px" }}
      />
    </FormControl>
  );
}
