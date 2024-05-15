import React from "react";
import { Poppins } from "next/font/google";
import { Table } from "@radix-ui/themes";
const poppins = Poppins({
  weight: "700",
  display: "auto",
  subsets: ["latin"],
});

const data = ["Task", "Title", "Assign", "Tags", "Status", "Priority", ""];

export default function TableHeaders() {
  return (
    <Table.Header>
      <Table.Row align="start">
        {data.map((name) => (
          <Table.ColumnHeaderCell key={name}>{name}</Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
