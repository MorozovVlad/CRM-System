import { TodoFilter, TodosResponse, Todo, NewTodo } from "../types/types";

export async function getTodos() : Promise<TodosResponse> {
  let request = "https://tech-mindset.ru/api/v1/tasks"

  const data = await fetch(request);
  console.log(data)
  if (!data.ok) {
    throw new Error();
  }
  const dataJson = await data.json();
  return dataJson;
}
    
export async function addTodo(newTodo: NewTodo) {
  const data = await fetch("https://tech-mindset.ru/api/v1/tasks", {
    method: "POST",
    body: JSON.stringify(newTodo),
  });
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

export async function editTodo(newTodo: NewTodo, id: number) {
  const data = await fetch(`https://tech-mindset.ru/api/v1/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(newTodo),
  });
  if (!data.ok) {
    throw new Error();
  }
}