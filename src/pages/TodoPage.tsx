import { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import AddTask from "../components/AddTask";
import {
  getTasks,
} from "../api/requests";
import { Todo, TodoInfo, TaskFilter } from "../types/types";

export default function TodoPage() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [TodoInfo, setTodoInfo] = useState<TodoInfo>({all: 0, completed: 0, inWork: 0});
  const [filter, setFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    getLoadData();
  }, [filter]);

  async function getLoadData() {
    try{
        const data = await getTasks(filter ?? "all");
        setTasks(data.data);
        setTodoInfo(data.info);
    }catch(err){
        alert("Не удалось загрузить данные");
    }
  }


  return (
    <div className="main">
      <AddTask getLoadData={ getLoadData } />
      <TodoList
        getLoadData={getLoadData}
        filter={filter}
        setFilter={setFilter}
        TodoInfo={TodoInfo}
        tasks={tasks}
      />
    </div>
  );
}
