import React, { FormEvent } from "react";
import * as Form from "@radix-ui/react-form";
interface Form {
  onSubmit: (e: FormEvent) => Promise<any>;
  children: React.ReactNode;
}

export default function Forms({ onSubmit, children }: Form) {
  return (
    <Form.Root
      style={{
        width: "700px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
      onSubmit={onSubmit}
    >
      {children}
    </Form.Root>
  );
}
