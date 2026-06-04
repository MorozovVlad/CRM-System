import { useState, useEffect } from "react";
// import "../styles/index.css";
import TodoList from "../components/TodoList";
import AddTask from "../components/AddTask";
import {
  getData,
  addTaskToServer,
  deleteTaskFromServer,
  editTaskOnServer,
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
        const data = await getData(filter);
        setTasks(data.data);
        setCountTasks(data.info);
    }catch(err){
        alert("Не удалось загрузить данные");
    }
  }

  async function addTask(newTaskTitle) {
    if (newTaskTitle.trim().length > 64 || newTaskTitle.trim().length < 2) {
      alert("Длина названия задачи должна быть от 2 до 64 символов");
      return;
    }
    const newTask = {
      title: newTaskTitle.trim(),
      isDone: false,
    };
    try{
        await addTaskToServer(newTask);
        await getLoadData();
    }catch(err){
        alert("Не удалось добавить задачу");
    } 
  }

  async function deleteTask(id) {
    try{
        await deleteTaskFromServer(id);
        await getLoadData();
    }catch(err){
        alert("Не удалось удалить задачу")
    }
  }

  async function editTask(id, newTitle, isDone) {
    if (newTitle.trim().length > 64 || newTitle.trim().length < 2) {
      alert("Длина названия задачи должна быть от 2 до 64 символов");
      return;
    }
    const newTask = {
      isDone: isDone,
      title: newTitle.trim(),
    };
    try{
        await editTaskOnServer(newTask, id);
        await getLoadData();
    }catch(err){
        alert("Не удалось редактировать задачу");
    }
  }

  return (
    <div className="main">
      <AddTask addTask={addTask} />
      <TodoList
        filter={filter}
        setFilter={setFilter}
        countTasks={countTasks}
        getData={getLoadData}
        editTask={editTask}
        deleteTask={deleteTask}
        tasks={tasks}
      />
    </div>
  );
}
