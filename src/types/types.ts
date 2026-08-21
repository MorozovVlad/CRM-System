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

export type TodoFilter = "all" | "inWork" | "completed" 

export type TodosResponse = {
  data: Todo[];
  info: TodoInfo;
  meta: {
    totalAmount: number;
  };
};