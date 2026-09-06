import { Todo, TodoInfo, TodoStatusCounts } from "../types/types";
import { UserOutlined, CalendarOutlined, EllipsisOutlined  } from '@ant-design/icons';
import { Button, Dropdown} from 'antd';
import TodoModal from "./TodoModal";
import { useState } from "react";
import { getTodos, editTodo } from "../api/requests";

type Props = {
    selectedTodo: number;
    todos: Todo[];
    getLoadData:() => void
};

export default function TodoDetails({selectedTodo, todos, getLoadData}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const items = [
        {
            key: '1',
            label: 'Редактировать',
            onClick: ()=>{
                setIsModalOpen(true)
            }
        },
    ];

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

    if (!todo) {
        return null
    }


    async function handleModalTodo(currentTodo:Todo) {
        const newTodo = {
          title: currentTodo?.title,
          description: currentTodo?.description,
          executorId: 1,
          status: currentTodo?.status,
          deadline: currentTodo?.deadline,
        };
        await editTodo(newTodo, currentTodo.id);
        await getLoadData();
        setIsModalOpen(false);
      }; 


    return (
      <div className="todoDetails">
        <Dropdown
          className="todoDetails-dropdown"
          menu={{ items }}
          placement="bottomRight"
        >
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
        <p className="todoDetails-title">{todo?.title}</p>
        <p className="todoDetails-value">
          <span className="todoDetails-label">Статус: </span>
          {todo?.status}
        </p>
        <p className="todoDetails-value">
          <span className="todoDetails-label">Исполнитель: </span>{" "}
          <UserOutlined /> {todo?.executor.name}
        </p>
        <p className="todoDetails-value">
          <span className="todoDetails-label">Создатель: </span>{" "}
          <UserOutlined /> {todo?.creator.name}
        </p>
        <p className="todoDetails-value">
          <span className="todoDetails-label">Дедлайн: </span>
          <CalendarOutlined />
          {formatDate(todo?.deadline)}
        </p>
        <p className="todoDetails-value">
          <span className="todoDetails-label">Создана: </span>
          {formatDate(todo?.createdAt)}
        </p>
        <p className="todoDetails-value">
          <span className="todoDetails-label">Обновлена: </span>
          {formatDate(todo?.updatedAt)}
        </p>

        <TodoModal
          titleModal="Редактировать задачу"
          isModalOpen={isModalOpen}
          handleCancel={setIsModalOpen}
          todo={todo}
          getLoadData={getLoadData}
          handleModalTodo={handleModalTodo}
        />
      </div>
    );
}
