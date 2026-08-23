import { NewTodo, TodoFilter, TodosResponse } from "../types/types";

export async function getTodos(filter: TodoFilter) : Promise<TodosResponse> {
  let request =
    filter == "all"
      ? "https://tech-mindset.ru/api/v1/tasks"
      : `https://tech-mindset.ru/api/v1/tasks?statuses=${filter}`;

  const data = await fetch(request);
  if (!data.ok) {
    throw new Error();
  }
  const dataJson = await data.json();
  return dataJson;
}
    
export async function addTodo(newTodo: NewTodo) {
    const data = await fetch('https://easydev.club/api/v1/todos',{
        method: 'POST',
            body: JSON.stringify(newTodo)
    })
    if (!data.ok) {
      throw new Error();
    }
}

export async function deleteTodo(id:number) {
    const data = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: 'DELETE',
    })
    if (!data.ok) {
      throw new Error();
    }
}

export async function editTodo(newTodo: NewTodo, id:number) {
    const data = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: "PUT",
        body: JSON.stringify(newTodo)
    })
    if (!data.ok) {
      throw new Error();
    }
}