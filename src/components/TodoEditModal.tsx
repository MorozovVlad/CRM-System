import { Input, Modal, Select, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { Todo, TodoInfo } from "../types/types";
import { useEffect, useState } from 'react';
import { editTodo } from "../api/requests";


type Props = {
    isModalOpen: boolean
    handleCancel: () => void
    todo: Todo
    getLoadData: () => void
}

const { TextArea } = Input;

export default function TodoEditModal({isModalOpen, handleCancel, todo, getLoadData}: Props) {

    async function onOk (){
        const newTodo = {
            title: currentTodo?.title,
            description: currentTodo?.description,
            executorId: 1,
            status: currentTodo?.status,
            deadline: currentTodo?.deadline
        }
        await editTodo(newTodo, todo.id)
        await getLoadData()
        handleCancel()
    }; 

    

    const [currentTodo, setCurrentTodo] = useState<Todo>(todo)
    useEffect(()=>{
        setCurrentTodo(todo)
    }, [todo])

    return (
        <>
        <Modal
            title="Редактировать задачу"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={onOk}
            onCancel={handleCancel}
            width={760}
        >
            <p>* Название</p>
            <Input value={currentTodo?.title}  onChange={(e)=>setCurrentTodo({...currentTodo, title: e.target.value})}/>
            <p>* Описание</p>
            <TextArea  
                placeholder='Опишите задачу, добавьте заголовки и списки...'
                style={{ height: 200, resize: 'none' }}
                value={todo?.description}
            />
            <div style={{display: "flex", gap: "12px"}}>
                <div>
                    <p>* Исполнитель</p>
                    <Select   
                        style={{width: 350}}
                        value={todo?.executor.name}
                    />
                </div>
                <div>
                    <p>* Статус</p>
                    <Select  
                        value={todo?.status}
                        style={{width: 350}}
                        // options={TodoInfo}
                    />
                </div>
            </div>
            <p>Дедлайн</p>
            <DatePicker  
                showTime
                onOk={onOk}
                style={{ width: 712 }}
                // value={formatDate(todo?.deadline)}
            />

        </Modal>
    </>
  );
};