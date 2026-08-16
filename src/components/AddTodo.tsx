import { useState, useEffect } from 'react'
import { addTodo } from '../api/requests';
import { validateTodoTitle } from '../helpers/validateTodoTitle';

type Props = {
  getLoadData: ()=>void
}

export default function AddTodo({ getLoadData }:Props) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleAddTodo(newTodoTitle: string) {
    if (validateTodoTitle(newTodoTitle)) {
      setIsError(true)
      return;
    }
    const newTodo = {
      title: newTodoTitle.trim(),
      isDone: false,
    };
    try {
      setNewTodoTitle("")
      setIsError(false)
      await addTodo(newTodo);
      await getLoadData();
    } catch (err) {
      alert("Не удалось добавить задачу");
    }
  }


  return (
    <div className="add-todo">
      <form className='add-todo-main' onSubmit={(e)=>{
        (e.preventDefault(), handleAddTodo(newTodoTitle));
      }}>
        <input
          placeholder="Todo To Be Done..."
          className="input-todo"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
          
        />
        <button
          type="submit"
          className="button-input"
        >
          Add
        </button>
      </form>
      {isError && newTodoTitle.length>0 && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
      </p>}
    </div>
  );
}