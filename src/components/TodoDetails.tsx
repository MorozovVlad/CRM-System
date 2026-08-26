import { Todo, TodoInfo } from "../types/types";

type Props = {
    selectedTodo: number;
    todos: Todo[];
};


export default function TodoDetails({selectedTodo, todos}: Props) {

    const formatDate = (date: string | undefined) =>{

        if (!date) return 'Не задан';

        return new Date(date).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })
    }

    const todo = todos.find(todo => todo.id == selectedTodo)

    console.log(todo)

    return(
        <div className="todoDetails">
            <p className="todoDetails-title">{todo?.title}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Статус: </span>{todo?.status}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Исполнитель: </span>{todo?.executor.name}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Создатель: </span>{todo?.creator.name}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Дедлайн: </span>
                {formatDate(todo?.deadline)}
            </p>
            <p className="todoDetails-value"><span className="todoDetails-label">Создана: </span>
                {formatDate(todo?.createdAt)}
            </p>
            <p className="todoDetails-value"><span className="todoDetails-label">Обновлена: </span>
                {formatDate(todo?.updatedAt)}
            </p>
        </div>
        
    )
}
