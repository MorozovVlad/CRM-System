import {useEffect, useState} from "react"
import EditButton from "../icons/EditButton";
import SaveButton from "../icons/SaveButton";
import CloseButton from "../icons/CloseButton";
import DeleteButton from "../icons/DeleteButton";
import { validateTaskTitle } from '../helpers/validateTaskTitle';

export default function TodoItem({handleEditTask, task, handleDeleteTask}){

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

    return(
        <>
            <form className="todo-item">
                <div className="round">
                    <input className="round-checkbox" id={task.id} checked={task.isDone} onChange={click => handleEditTask(task.id, currentTitle, !task.isDone)} type="checkbox"/>
                    <label htmlFor={task.id}></label>
                </div>
                {!isEdit && <p className={task.isDone && "task-isDone"}>{task.title}</p>}         
                {isEdit && <input value={currentTitle} onChange={e => {setCurrentTitle(e.target.value)}}/>}
                {!isEdit && <button onClick={click => setIsEdit(true)}>
                    <EditButton/>
                </button>}
                {isEdit && <button type="submit" onClick={click => {     
                                                                    setIsEdit(false);
                                                                    if(!isError){
                                                                        handleEditTask(task.id, currentTitle, task.isDone);
                                                                    }
                                                                }}>
                    <SaveButton/>             
                </button>}
                {isEdit && <button onClick={click => {setIsEdit(false), setCurrentTitle(task.title)}}>
                    <CloseButton/>
                </button>}
                <button className="red-button" onClick={click => handleDeleteTask(task.id)}>
                    <DeleteButton/>
                </button>
            </form >
            {isError && isEdit && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
            </p>}

        </>
    )
}