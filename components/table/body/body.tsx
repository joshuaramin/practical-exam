import React, { useEffect, useState } from "react";
import TableRow from "./row/row";

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
    <div className="w-full border-l-2 border-r-2 border-black rounded-sm">
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
            id={id}
            title={title}
            status={status}
            assign={Assign}
            tags={tags}
            priority={priority}
            description={description}
          />
        )
      )}
    </div>
  );
}
