import { Todo, TodoInfo } from "../types/types";
import { UserOutlined, CalendarOutlined, EllipsisOutlined  } from '@ant-design/icons';
import { Button, Dropdown, Flex, Space } from 'antd';
import TodoEditModal from "./TodoEditModal";
import { useState } from "react";

type Props = {
    selectedTodo: number;
    todos: Todo[];
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void
};

export default function TodoDetails({selectedTodo, todos, isEdit, setIsEdit}: Props) {



    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };


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

    return(
        <div className="todoDetails">
            <Dropdown className="todoDetails-dropdown" menu={{ items }}  placement="bottomRight">
                <Button icon={<EllipsisOutlined />} />
            </Dropdown>
            <p className="todoDetails-title">{todo?.title}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Статус: </span>{todo?.status}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Исполнитель: </span> <UserOutlined/> {todo?.executor.name}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Создатель: </span> <UserOutlined/> {todo?.creator.name}</p>
            <p className="todoDetails-value"><span className="todoDetails-label">Дедлайн: </span>
                <CalendarOutlined />{formatDate(todo?.deadline)}
            </p>
            <p className="todoDetails-value"><span className="todoDetails-label">Создана: </span>
                {formatDate(todo?.createdAt)}
            </p>
            <p className="todoDetails-value"><span className="todoDetails-label">Обновлена: </span>
                {formatDate(todo?.updatedAt)}
            </p>

            <TodoEditModal 
                isModalOpen = {isModalOpen}
                handleOk = {handleOk}
                handleCancel = {handleCancel}
            />
        </div>
        
    )
}
