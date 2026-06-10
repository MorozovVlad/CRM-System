import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function TodoItem({editTask, task, deleteTask}){

    const [currentTitle, setCurrentTitle] = useState(task.title)
    const [edit, setEdit] = useState(false)

    const [error, setError] = useState(false)

    function checkInput(){
        if(currentTitle.trim().length > 64 || currentTitle.trim().length < 2){
            setError(true)
        }else{
            setError(false)
        }
    }

    return(
        <>
            <div className="todo-item">
                <div class="round">
                    <input className="round-checkbox" id={task.id} checked={task.isDone} onChange={click => editTask(task.id, currentTitle, !task.isDone)} type="checkbox"/>
                    <label for={task.id}></label>
                </div>
                {!edit && <p className={task.isDone && "task-isDone"}>{task.title}</p>}         
                {edit && <input value={currentTitle} onChange={e => setCurrentTitle(e.target.value)}/>}
                {!edit && <button onClick={click => setEdit(true)}>
                    <FaEdit style={{color: "white", fontSize: "15px"}}/>
                </button>}
                {edit && <button onClick={click => {setEdit(false), editTask(task.id, currentTitle, task.isDone), checkInput()}}>
                    <FaSave style={{color: "white", fontSize: "15px"}}/>
                </button>}
                {edit && <button onClick={click => {setEdit(false), setCurrentTitle(task.title)}}>
                    <MdCancel style={{color: "white", fontSize: "15px"}}/>
                </button>}
                <button className="red-button" onClick={click => deleteTask(task.id)}>
                    <MdDelete style={{color: "white", fontSize: "20px"}}/>
                </button>
            </div >
            {error && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
                <button className="button-close" onClick={error=>setError(false)}>скрыть</button>
            </p>}

        </>
    )
}