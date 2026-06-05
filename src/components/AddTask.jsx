import { useState } from 'react'
import { addTaskToServer } from '../api/requests';

export default function AddTask({ getLoadData }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  async function addTask(newTaskTitle) {
    if (newTaskTitle.trim().length > 64 || newTaskTitle.trim().length < 2) {
      alert("Длина названия задачи должна быть от 2 до 64 символов");
      return;
    }
    const newTask = {
      title: newTaskTitle.trim(),
      isDone: false,
    };
    try {
      await addTaskToServer(newTask);
      await getLoadData();
    } catch (err) {
      alert("Не удалось добавить задачу");
    }
  }

  return (
    <div className="add-task">
      <input
        placeholder="Task To Be Done..."
        className="input-task"
        onChange={(e) => setNewTaskTitle(e.target.value)}
        value={newTaskTitle}
      />
      <button
        className="button-input"
        onClick={(click) => {
          (addTask(newTaskTitle), setNewTaskTitle(""));
        }}
      >
        Add
      </button>
    </div>
  );
}