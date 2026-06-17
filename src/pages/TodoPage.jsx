import { useState, useEffect } from "react";
// import "../styles/index.css";
import TodoList from "../components/TodoList";
import AddTask from "../components/AddTask";
import {
  getTasks,
  addTask
} from "../api/requests";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [countTasks, setCountTasks] = useState({});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getLoadData();
  }, [filter]);

  async function getLoadData() {
    try{
        const data = await getTasks(filter);
        setTasks(data.data);
        setCountTasks(data.info);
    }catch(err){
        alert("Не удалось загрузить данные");
    }
  }


  return (
    <div className="main">
      <AddTask getLoadData={getLoadData} />
      <TodoList
        getLoadData={getLoadData}
        filter={filter}
        setFilter={setFilter}
        countTasks={countTasks}
        tasks={tasks}
      />
    </div>
  );
}
