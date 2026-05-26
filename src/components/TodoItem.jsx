import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function TodoItem({editTask, task, deleteTask}){

    const [currentTitle, setCurrentTitle] = useState(task.title)
    const [edit, setEdit] = useState(false)


    return(
        <>
            <div className="todo-item">
                <input checked={task.isDone} onChange={click => editTask(task.id, currentTitle, !task.isDone)} type="checkbox"/>
                <p style={{ color: task.isDone ? "#909091" : "" ,textDecoration: task.isDone ? "line-through" : "", display: edit ? "none" : "", margin: 0}}>{task.title}</p>
                <input value={currentTitle} onChange={e => setCurrentTitle(e.target.value)}  style={{display: edit ? "" : "none"}}/>
                <button onClick={click => setEdit(true)} style={{display: edit ? "none" : ""}}>
                    <FaEdit style={{color: "white", fontSize: "15px"}}/>
                </button>
                <button onClick={click => {setEdit(false), editTask(task.id, currentTitle, task.isDone)}} style={{display: edit ? "" : "none"}}>
                    <FaSave style={{color: "white", fontSize: "15px"}}/>
                </button>
                <button onClick={click => setEdit(false)} style={{display: edit ? "" : "none"}}>
                    <MdCancel style={{color: "white", fontSize: "15px"}}/>
                </button>
                <button style={{backgroundColor: "#ff6756"}} onClick={click => deleteTask(task.id)}>
                    <MdDelete style={{color: "white", fontSize: "20px"}}/>
                </button>
            </div >
            
        </>
    )
}