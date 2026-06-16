import { useState, useEffect } from 'react'
import { addTask } from '../api/requests';

export default function AddTask({ getLoadData }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState(false);

  async function handleAddTask(newTaskTitle) {
    if (newTaskTitle.trim().length > 64 || newTaskTitle.trim().length < 2) {
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

  useEffect(()=>{
          if(newTaskTitle.trim().length > 64 || newTaskTitle.trim().length < 2){
              setError(true)
          }else{
              setError(false)
          }
      }, [newTaskTitle])

  return (
    <div className="add-task">
      <div className='add-task-main'>
        <input
          placeholder="Task To Be Done..."
          className="input-task"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button
          className="button-input"
          onClick={(click) => {
            (handleAddTask(newTaskTitle));
          }}
        >
          Add
        </button>
      </div>
      {error && newTaskTitle.length>0 && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
      </p>}
    </div>
  );
}