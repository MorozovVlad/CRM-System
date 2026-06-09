import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import { deleteTaskFromServer, editTaskOnServer } from "../api/requests";

export default function TodoList({setFilter, filter, countTasks, tasks, getLoadData}){


  async function deleteTask(id) {
    try{
        await deleteTaskFromServer(id);
        await getLoadData();
    }catch(err){
        alert("Не удалось удалить задачу")
    }
  }

  async function editTask(id, newTitle, isDone) {
    if (newTitle.trim().length > 64 || newTitle.trim().length < 2) {
      return;
    }
    const newTask = {
      isDone: isDone,
      title: newTitle.trim(),
    };
    try{
        await editTaskOnServer(newTask, id);
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
            onClick={(click) => {
              setFilter("all");
            }}
          >
            Все ({countTasks.all})
          </button>
          <button
            className={
              filter === "inWork" ? "button-filter-selected" : "button-filter"
            }
            onClick={(click) => {
              setFilter("inWork");
            }}
          >
            в работе ({countTasks.inWork})
          </button>
          <button
            className={
              filter === "completed" ? "button-filter-selected" : "button-filter"
            }
            onClick={(click) => {
              setFilter("completed");
            }}
          >
            сделано ({countTasks.completed})
          </button>
        </div>
        {tasks.map((task) => {
          return (
            <TodoItem
              // error={error}
              editTask={editTask}
              deleteTask={deleteTask}
              key={task.id}
              task={task}
            />
          );
        })}
      </>
    );
}