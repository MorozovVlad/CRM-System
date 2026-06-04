import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"

export default function TodoList({setFilter, filter, countTasks, getData, getCompletedData, getInWorkData, editTask, tasks, deleteTask}){
    

    let all = countTasks.all
    let inWork = countTasks.inWork
    let isDone = countTasks.completed

 
    return(
        <>
            <div className="buttons">
                <button className={filter===0 ? "button-filter-selected" : "button-filter"} onClick={click => {setFilter("all")}}>Все ({all})</button>
                <button className={filter===true ? "button-filter-selected" : "button-filter"} onClick={click => {setFilter("inWork")}}>в работе ({inWork})</button>
                <button className={filter===false ? "button-filter-selected" : "button-filter"} onClick={click =>{setFilter("completed")}  }>сделано ({isDone})</button>
            </div>
            {tasks.map(task=>{
                return <TodoItem editTask={editTask} deleteTask={deleteTask} key={task.id} task={task}/>
            })}
        </>
    )
}