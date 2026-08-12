import {useEffect, useState} from "react"
import EditButton from "../icons/EditButton";
import SaveButton from "../icons/SaveButton";
import CloseButton from "../icons/CloseButton";
import DeleteButton from "../icons/DeleteButton";
import { validateTaskTitle } from '../helpers/validateTaskTitle';
import {Todo} from "../types/types";

type Props = {
  handleEditTask: (id: number, newTitle: string, isDone: boolean)=> void
  task: Todo
  handleDeleteTask: (id: number)=>void
}

export default function TodoItem({handleEditTask, task, handleDeleteTask}: Props){

    const [currentTitle, setCurrentTitle] = useState(task.title)
    const [isEdit, setIsEdit] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        if(validateTaskTitle(currentTitle)){
            setIsError(true)
        }else{
            setIsError(false)
        }
    }, [currentTitle])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEdit(false);
        if(!isError){
            handleEditTask(task.id, currentTitle, task.isDone);
        }    
    }

    return(
        <>
            <form className="todo-item" onSubmit={handleSubmit}>
                <div className="round">
                    <input className="round-checkbox" id={String(task.id)} checked={task.isDone} onChange={() => handleEditTask(task.id, currentTitle, !task.isDone)} type="checkbox"/>
                    <label htmlFor={String(task.id)}></label>
                </div>

                {!isEdit && 
                    <>
                        <p className={String(task.isDone && "task-isDone")}>{task.title}</p>
                        <button type="button" onClick={() => setIsEdit(true)}>
                            <EditButton/>
                        </button>
                    </>
                }
                {isEdit &&
                    <>
                        <input value={currentTitle} onChange={e => {setCurrentTitle(e.target.value)}}/>
                        <button type="submit">
                            <SaveButton/>             
                        </button>
                        <button type="button" onClick={() => {setIsEdit(false), setCurrentTitle(task.title)}}>
                            <CloseButton/>
                        </button>
                    </>                 
                }

                <button type="button" className="red-button" onClick={() => handleDeleteTask(task.id)}>
                    <DeleteButton/>
                </button>
            </form >
            {isError && isEdit && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
            </p>}
        </>
    )
}