import React, { useEffect, useState } from "react";
import TableHeaders from "./header/headers";
import TableBody from "./body/body";
import { Table } from "@radix-ui/themes";

export default function Tables() {
  return (
    <Table.Root
      style={{ width: "100%", height: "100vh", position: "relative" }}
      layout="auto"
      variant="ghost"
      size="3"
    >
      <TableHeaders />
      <TableBody />
    </Table.Root>
  );
}
