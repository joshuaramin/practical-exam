import React, { useEffect, useState } from "react";
import TableRow from "./row/row";
import { Table } from "@radix-ui/themes";
export default function TableBody() {
  const [task, setTask] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/get`, {
        method: "GET",
      });

      const result = await response.json();

      setTask(result);
    };

    fetchData();
  }, []);

  return (
    <Table.Body>
      {task?.map(
        ({
          taskID,
          id,
          title,
          status,
          priority,
          tags,
          Assign,
          description,
        }) => (
          <TableRow
            key={taskID}
            taskID={taskID}
            tags={tags}
            status={status}
            assign={Assign}
            id={id}
            title={title}
            priority={priority}
            description={description}
          />
        )
      )}
    </Table.Body>
  );
}
