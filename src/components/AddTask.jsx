import { useState, useEffect } from 'react'
import { addTask } from '../api/requests';
import { validateTaskTitle } from '../helpers/validateTaskTitle';

export default function AddTask({ getLoadData }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState(false);

  async function handleAddTask(newTaskTitle) {
    if (validateTaskTitle(newTaskTitle)) {
      setError(true)
      return;
    }
    const newTask = {
      title: newTaskTitle.trim(),
      isDone: false,
    };
    try {
      setNewTaskTitle("")
      setError(false)
      await addTask(newTask);
      await getLoadData();
    } catch (err) {
      alert("Не удалось добавить задачу");
    }
  }


  return (
    <div className="add-task">
      <form className='add-task-main' onSubmit={(e)=>{
        e.preventDefault()
      }}>
        <input
          placeholder="Task To Be Done..."
          className="input-task"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
          
        />
        <button
          type="submit"
          className="button-input"
          onClick={(click) => {
            (handleAddTask(newTaskTitle));
          }}
        >
          Add
        </button>
      </form>
      {error && newTaskTitle.length>0 && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
      </p>}
    </div>
  );
}