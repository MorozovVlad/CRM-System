import { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import TodoDetails from "../components/TodoDetails";
import { getTodos } from "../api/requests";
import { Todo, TodoStatusCounts } from "../types/types";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedTodo, setSelectedTodo] = useState(0)

  useEffect(()=>{
    getLoadData()
  }, [])

  async function getLoadData() {
    console.log("1111111111111111111111111111111111111111111111111")
    try{
        const data = await getTodos();
        let all = 0;
        for(let key in data.meta.statusCounts){
          all += data.meta.statusCounts[key as keyof TodoStatusCounts];
        }
        setTodos(data.data);        
    }catch(err){
        alert("Не удалось загрузить данные");
    }
  }

  

  return (
    <div className="main">
      <TodoList
        getLoadData={getLoadData}
        todos={todos}
        setSelectedTodo={setSelectedTodo}
        selectedTodo = {selectedTodo}
      />
      <TodoDetails
        selectedTodo = {selectedTodo}
        todos={todos}
        getLoadData={getLoadData}
      />
    </div>
  );
}
