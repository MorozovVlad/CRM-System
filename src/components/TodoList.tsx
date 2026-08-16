import TodoItem from "./TodoItem"
import { deleteTodo, editTodo } from "../api/requests";
import { Todo, TodoInfo, TodoFilter } from "../types/types";
import TodoFilters from "./TodoFilters";


type Props = {
  setFilter: (filter: TodoFilter) => void;
  filter: TodoFilter;
  TodoInfo: TodoInfo;
  todos: Todo[];
  getLoadData: () => void;
};

export default function TodoList({setFilter, filter, TodoInfo, todos, getLoadData}:Props){

  async function handleDeleteTodo(id: number) {
    try{
        await deleteTodo(id);
        await getLoadData();
    }catch(err){
        alert("Не удалось удалить задачу")
    }
  }

  async function handleEditTodo(id: number, newTitle: string, isDone: boolean) {
    const newTodo = {
      isDone: isDone,
      title: newTitle.trim(),
    };
    try{
        await editTodo(newTodo, id);
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
        {todos.map((todo) => {
          return (
            <TodoItem
              handleEditTodo={handleEditTodo}
              handleDeleteTodo={handleDeleteTodo}
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </>
    );
}