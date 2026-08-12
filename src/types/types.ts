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

export type TodoInfo = {
    all: number
    completed: number
    inWork: number
}

export type TaskFilter = "all" | "inWork" | "completed" 

export type TasksResponse = {
  data: Todo[];
  info: TodoInfo;
  meta: {
    totalAmount: number;
  };
};