import { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import TodoDetails from "../components/TodoDetails";
import {
  getTodos,
} from "../api/requests";
import { Todo, TodoInfo, TodoFilter, TodoStatusCounts } from "../types/types";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const[isEdit, setIsEdit] = useState<boolean>(false)

  const [TodoInfo, setTodoInfo] = useState<TodoInfo>({
    all:0,
    backlog: 0,
    done: 0,
    inProgress: 0,
    onHold: 0,
    readyForRelease: 0,
    review: 0,
    todo: 0,
  });

  const [filter, setFilter] = useState<TodoFilter>("all");
  const [selectedTodo, setSelectedTodo] = useState(0)

  useEffect(() => {
    getLoadData();
  }, [filter]);

  useEffect(() => {
    if (todos.length > 0) {
      setSelectedTodo(todos[0].id);
    }
  }, [todos]);

  async function getLoadData() {
    try{
        const data = await getTodos(filter ?? "all");
        let all = 0;
        for(let key in data.meta.statusCounts){
          all += data.meta.statusCounts[key as keyof TodoStatusCounts];
        }
        setTodos(data.data);
        setTodoInfo({all, ...data.meta.statusCounts});
        
    }catch(err){
        alert("Не удалось загрузить данные");
    }
  }

  console.log(isEdit);

  return (
    <div className="main">
      {/* <AddTodo getLoadData={ getLoadData } /> */}
      <TodoList
        getLoadData={getLoadData}
        filter={filter}
        setFilter={setFilter}
        TodoInfo={TodoInfo}
        todos={todos}
        setSelectedTodo={setSelectedTodo}
        selectedTodo = {selectedTodo}
      />
      <TodoDetails
        selectedTodo = {selectedTodo}
        todos={todos}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
}
