import React, { useEffect, useState } from "react";
import TableHeaders from "./header/headers";
import TableBody from "./body/body";

export default function Table() {

  const [task, setTask] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/get`, { method: "GET" });

      const result = await response.json();

      setTask(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <TableHeaders />
        <TableBody />
      </div>
      <span className="text-lg">Total of Task: {task.length}</span>
    </div>
  );
}
