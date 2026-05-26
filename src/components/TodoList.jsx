import { useState } from "react"
import TodoItem from "./TodoItem"

export default function TodoList({editTask, tasks, deleteTask}){
    const [filter, setFilter] = useState(0)

    let all = tasks.length
    let inWork = 0
    let isDone = 0

    for(let i=0; i<all; i++){
        if(tasks[i].isDone === true){
            isDone++
        }else{
            inWork++
        }
    }

    return(
        <>
            <div className="buttons">
                <button className={filter===0 ? "button-filter-selected" : "button-filter"} onClick={click => setFilter(0)}>Все ({all})</button>
                <button className={filter===true ? "button-filter-selected" : "button-filter"} onClick={click => setFilter(true)}>в работе ({inWork})</button>
                <button className={filter===false ? "button-filter-selected" : "button-filter"} onClick={click => setFilter(false)}>сделано ({isDone})</button>
            </div>
            {tasks.map(task=>{
                if(task.isDone !== filter) return <TodoItem editTask={editTask} deleteTask={deleteTask} key={task.id} task={task}/>
            })}
        </>
    )
}