import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import { deleteTask, editTask } from "../api/requests";

export default function TodoList({setFilter, filter, countTasks, tasks, getLoadData}){


  async function handleDeleteTask(id) {
    try{
        await deleteTask(id);
        await getLoadData();
    }catch(err){
        alert("Не удалось удалить задачу")
    }
  }

  async function handleEditTask(id, newTitle, isDone) {
    const newTask = {
      isDone: isDone,
      title: newTitle.trim(),
    };
    try{
        await editTask(newTask, id);
        await getLoadData();
    }catch(err){
        alert("Не удалось редактировать задачу");
    }
  }

    return (
      <>
        <div className="buttons">
          <button
            className={
              filter === "all" ? "button-filter-selected" : "button-filter"
            }
            onClick={() => {
              setFilter("all");
            }}
          >
            Все ({countTasks.all})
          </button>
          <button
            className={
              filter === "inWork" ? "button-filter-selected" : "button-filter"
            }
            onClick={() => {
              setFilter("inWork");
            }}
          >
            в работе ({countTasks.inWork})
          </button>
          <button
            className={
              filter === "completed" ? "button-filter-selected" : "button-filter"
            }
            onClick={() => {
              setFilter("completed");
            }}
          >
            сделано ({countTasks.completed})
          </button>
        </div>
        {tasks.map((task) => {
          return (
            <TodoItem
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              key={task.id}
              task={task}
            />
          );
        })}
      </>
    );
}