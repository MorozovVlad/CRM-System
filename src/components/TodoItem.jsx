import {useState} from "react"
import EditButton from "../icons/EditButton";
import SaveButton from "../icons/SaveButton";
import CloseButton from "../icons/CloseButton";
import DeleteButton from "../icons/DeleteButton";

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
                    <EditButton/>
                </button>}
                {edit && <button onClick={click => {setEdit(false), editTask(task.id, currentTitle, task.isDone), checkInput()}}>
                    <SaveButton/>             
                </button>}
                {edit && <button onClick={click => {setEdit(false), setCurrentTitle(task.title)}}>
                    <CloseButton/>
                </button>}
                <button className="red-button" onClick={click => deleteTask(task.id)}>
                    <DeleteButton/>
                </button>
            </div >
            {error && <p className='error-message'>
                Длина задачи должна быть от 2 до 64 символов
                <button className="button-close" onClick={error=>setError(false)}>скрыть</button>
            </p>}

        </>
    )
}