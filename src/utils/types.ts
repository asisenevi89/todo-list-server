export type TodoType = {
  id: number,
  title: string,
  status: string,
};

export type TodoListType = {
  total: number,
  data: TodoType[],
};

export type TodoAddType = {
  title: string,
  status: string,
};

export type ToDoDeleteType= {
  deletedId: number,
};

export type TodoResData = TodoListType | TodoType | ToDoDeleteType | {};

export type PromiseErrorType = {
  statusCode: number,
  message: string,
};