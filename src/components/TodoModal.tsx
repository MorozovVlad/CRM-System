import { Input, Modal, Select, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { Todo, TodoInfo } from "../types/types";
import { useEffect, useState } from 'react';
import { editTodo } from "../api/requests";


type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  todo: Todo;
  getLoadData: () => void;
  handleModalTodo:(currentTodo:Todo) => void;
  titleModal: string
};

const { TextArea } = Input;

export default function TodoModal({
  isModalOpen,
  handleCancel,
  todo,
  handleModalTodo,
  titleModal,
}: Props) {
  const [currentTodo, setCurrentTodo] = useState<Todo>(todo);
  useEffect(() => {
    setCurrentTodo(todo);
  }, [todo]);

  return (
    <>
      <Modal
        title={titleModal}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => handleModalTodo(currentTodo)}
        onCancel={() => handleCancel(false)}
        width={760}
      >
        <p>* Название</p>
        <Input
          value={currentTodo?.title}
          onChange={(e) =>
            setCurrentTodo({ ...currentTodo, title: e.target.value })
          }
        />
        <p>* Описание</p>
        <TextArea
          placeholder="Опишите задачу, добавьте заголовки и списки..."
          style={{ height: 200, resize: "none" }}
          value={todo?.description}
        />
        <div style={{ display: "flex", gap: "12px" }}>
          <div>
            <p>* Исполнитель</p>
            <Select style={{ width: 350 }} value={todo?.executor.name} />
          </div>
          <div>
            <p>* Статус</p>
            <Select
              value={todo?.status}
              style={{ width: 350 }}
              // options={TodoInfo}
            />
          </div>
        </div>
        <p>Дедлайн</p>
        <DatePicker
          showTime
          //   onOk={onOk}
          style={{ width: 712 }}
          // value={formatDate(todo?.deadline)}
        />
      </Modal>
    </>
  );
};