import TodoItem from "./TodoItem"
import { deleteTask, editTask } from "../api/requests";
import { Todo, TodoInfo, TaskFilter } from "../types/types";
import TodoFilters from "./TodoFilters";


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
        <TodoFilters
          setFilter={setFilter}
          filter={filter}
          TodoInfo={TodoInfo}
        />
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