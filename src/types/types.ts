export type NewTodo = {
    isDone: boolean
    title: string
}

export type Todo = {
    id: number
    title: string
    created: string
    isDone: boolean
}


export type TodoStatusCounts = {
  backlog: number;
  done: number;
  inProgress: number;
  onHold: number;
  readyForRelease: number;
  review: number;
  todo: number;
};

export type TodoInfo = TodoStatusCounts & {
  all: number;
};

export type TodoFilter =
  | "all"
  | "backlog"
  | "done"
  | "inProgress"
  | "onHold"
  | "readyForRelease"
  | "review"
  | "todo"; 

export type TodosResponse = {
  data: Todo[];
  total: number;
  meta: {
    statusCounts: TodoStatusCounts;
  };
};