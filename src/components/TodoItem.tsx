import {useEffect, useState} from "react"
import EditButton from "../icons/EditButton";
import SaveButton from "../icons/SaveButton";
import CloseButton from "../icons/CloseButton";
import DeleteButton from "../icons/DeleteButton";
import { validateTodoTitle } from '../helpers/validateTodoTitle';
import {Todo} from "../types/types";

type Props = {
  handleEditTodo: (id: number, newTitle: string, isDone: boolean)=> void
  todo: Todo
  handleDeleteTodo: (id: number)=>void
}

export default function TodoItem({handleEditTodo, todo, handleDeleteTodo}: Props){

    const [currentTitle, setCurrentTitle] = useState(todo.title)
    const [isEdit, setIsEdit] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        if(validateTodoTitle(currentTitle)){
            setIsError(true)
        }else{
            setIsError(false)
        }
    }, [currentTitle])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEdit(false);
        if(!isError){
            handleEditTodo(todo.id, currentTitle, todo.isDone);
        }    
    }

    return(
        <>
            <form className="todo-item" onSubmit={handleSubmit}>
                <div className="round">
                    <input className="round-checkbox" id={String(todo.id)} checked={todo.isDone} onChange={() => handleEditTodo(todo.id, currentTitle, !todo.isDone)} type="checkbox"/>
                    <label htmlFor={String(todo.id)}></label>
                </div>

                {!isEdit && 
                    <>
                        <p className={`${String(todo.isDone && "todo-isDone")} todo-item__title `}>{todo.title}</p>
                        <button type="button" onClick={() => setIsEdit(true)}>
                            <EditButton/>
                        </button>
                    </>
                }
                {isEdit &&
                    <>
                        <input className="todo-item__input-todo" value={currentTitle} onChange={e => {setCurrentTitle(e.target.value)}}/>
                        <button type="submit">
                            <SaveButton/>             
                        </button>
                        <button type="button" onClick={() => {setIsEdit(false), setCurrentTitle(todo.title)}}>
                            <CloseButton/>
                        </button>
                    </>                 
                }

                <button type="button" className="red-button" onClick={() => handleDeleteTodo(todo.id)}>
                    <DeleteButton/>
                </button>
            </form >
            {isError && isEdit && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
            </p>}
        </>
    )
}