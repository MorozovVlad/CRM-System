import { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import {
  getTodos,
} from "../api/requests";
import { Todo, TodoInfo, TodoFilter } from "../types/types";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [TodoInfo, setTodoInfo] = useState<TodoInfo>({all: 0, completed: 0, inWork: 0});
  const [filter, setFilter] = useState<TodoFilter>("all");

  useEffect(() => {
    getLoadData();
  }, [filter]);

  async function getLoadData() {
    try{
        const data = await getTodos(filter ?? "all");
        setTodos(data.data);
        setTodoInfo(data.info);
    }catch(err){
        alert("Не удалось загрузить данные");
    }
  }


  return (
    <div className="main">
      <AddTodo getLoadData={ getLoadData } />
      <TodoList
        getLoadData={getLoadData}
        filter={filter}
        setFilter={setFilter}
        TodoInfo={TodoInfo}
        todos={todos}
      />
    </div>
  );
}
