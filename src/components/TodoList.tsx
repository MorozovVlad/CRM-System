import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import { deleteTask, editTask } from "../api/requests";
import { Todo, TodoInfo, TaskFilter } from "../types/types";


type Props = {
  setFilter: (filter: TaskFilter) => void;
  filter: TaskFilter;
  TodoInfo: TodoInfo;
  tasks: Todo[];
  getLoadData: () => void;
};

export default function TodoList({setFilter, filter, TodoInfo, tasks, getLoadData}:Props){

  async function handleDeleteTask(id: number) {
    try{
        await deleteTask(id);
        await getLoadData();
    }catch(err){
        alert("Не удалось удалить задачу")
    }
  }

  async function handleEditTask(id: number, newTitle: string, isDone: boolean) {
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
            Все ({TodoInfo.all})
          </button>
          <button
            className={
              filter === "inWork" ? "button-filter-selected" : "button-filter"
            }
            onClick={() => {
              setFilter("inWork");
            }}
          >
            в работе ({TodoInfo.inWork})
          </button>
          <button
            className={
              filter === "completed" ? "button-filter-selected" : "button-filter"
            }
            onClick={() => {
              setFilter("completed");
            }}
          >
            сделано ({TodoInfo.completed})
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