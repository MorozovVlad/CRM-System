import {useEffect, useState} from "react"
import EditButton from "../icons/EditButton";
import SaveButton from "../icons/SaveButton";
import CloseButton from "../icons/CloseButton";
import DeleteButton from "../icons/DeleteButton";
import { validateTaskTitle } from '../helpers/validateTaskTitle';

export default function TodoItem({handleEditTask, task, handleDeleteTask}){

    const [currentTitle, setCurrentTitle] = useState(task.title)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        if(validateTaskTitle(currentTitle)){
            setError(true)
        }else{
            setError(false)
        }
    }, [currentTitle])
    console.log(error)

    return(
        <>
            <form className="todo-item">
                <div className="round">
                    <input className="round-checkbox" id={task.id} checked={task.isDone} onChange={click => handleEditTask(task.id, currentTitle, !task.isDone)} type="checkbox"/>
                    <label htmlFor={task.id}></label>
                </div>
                {!edit && <p className={task.isDone && "task-isDone"}>{task.title}</p>}         
                {edit && <input value={currentTitle} onChange={e => {setCurrentTitle(e.target.value)}}/>}
                {!edit && <button onClick={click => setEdit(true)}>
                    <EditButton/>
                </button>}
                {edit && <button type="submit" onClick={click => {     
                                                                    setEdit(false);
                                                                    if(!error){
                                                                        handleEditTask(task.id, currentTitle, task.isDone);
                                                                    }
                                                                }}>
                    <SaveButton/>             
                </button>}
                {edit && <button onClick={click => {setEdit(false), setCurrentTitle(task.title)}}>
                    <CloseButton/>
                </button>}
                <button className="red-button" onClick={click => handleDeleteTask(task.id)}>
                    <DeleteButton/>
                </button>
            </form >
            {error && edit && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
            </p>}

        </>
    )
}