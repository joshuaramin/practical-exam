export type TodoList = {
  taskID: string | undefined;
  title: string;
  description: string;
  priority: string;
  status: string;
  Assign: any;
  token?: string;
};

export type CreateTodoList = {
  title: string;
  description: string;
  priority: string;
  status: string;
  tags: string;
};

export type User = {
  id: string;
  username: string;
};
