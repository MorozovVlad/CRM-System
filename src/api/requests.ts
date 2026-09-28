import { TodoFilter, TodosResponse, Todo, NewTodo } from "../types/types";
import axios from 'axios';


export async function getTodos(){
  let data = await axios.get("https://tech-mindset.ru/api/v1/tasks",{
    params: {
      limit:100
    }
  })
  return data.data
}
    
export async function addTodo(newTodo: NewTodo) {
  await axios.post("https://tech-mindset.ru/api/v1/tasks", newTodo)
}

export async function deleteTodo(id:number) {
  await axios.delete(`https://easydev.club/api/v1/todos/${id}`)
}

export async function editTodo(newTodo: NewTodo, id: number) {
  await axios.put(`https://tech-mindset.ru/api/v1/tasks/${id}`, newTodo)
}