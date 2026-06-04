import { useState, useEffect } from "react";
// import "../styles/index.css";
import TodoList from "../components/TodoList";
import AddTask from "../components/AddTask";
import {
  getData,
  addTaskServer,
  deleteTaskServer,
  editTaskServer,
} from "../api/requests";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [countTasks, setCountTasks] = useState({});
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    getLoadData();
  }, [filter]);

  async function getLoadData() {
    const data = await getData(filter);
    setTasks(data.data);
    setCountTasks(data.info);
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
    await addTaskServer(newTask);
    await getLoadData();
  }

  async function deleteTask(id) {
    await deleteTaskServer(id);
    await getLoadData();
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
    await editTaskServer(newTask, id);
    await getLoadData();
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
