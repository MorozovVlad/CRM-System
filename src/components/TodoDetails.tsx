import { Todo, TodoInfo } from "../types/types";

type Props = {
    selectedTodo: number;
    todos: Todo[];
};

export default function TodoDetails({selectedTodo, todos}: Props) {





    return(
        <>
            {/* {todos.length > 0 ? <p>{todos[selectedTodo].title}</p> : <p>Загрузка</p>} */}
        </>
        
    )
}
