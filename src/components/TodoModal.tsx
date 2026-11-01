import {Button, Input, Modal, Select, DatePicker, Form } from 'antd';
import type { DatePickerProps } from 'antd';
import { Todo, NewTodo } from "../types/types";
import { useEffect, useState } from 'react';
import { editTodo } from "../api/requests";
import dayjs from 'dayjs';

type Props = {
  isModalOpen: boolean;
  handleCancel: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: Todo;
  getLoadData: () => void;
  handleModalTodo: (currentTodo: NewTodo) => void;
  titleModal: string;
};

type TodoModalValues = {
  title: string;
  description: string;
  executorId: number;
  status: string;
  deadline: any;
};

const { TextArea } = Input;

export default function TodoModal({
  isModalOpen,
  handleCancel,
  todo,
  handleModalTodo,
  titleModal,
}: Props) {


  const [form] = Form.useForm<TodoModalValues>();

  const handleFiinish = (values: TodoModalValues)=>{
    console.log({ ...values!, id: todo?.id });
    handleModalTodo({...values!, id: todo?.id});
  }

  const handleFiinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: todo?.title,
      description: todo?.description,
      deadline: todo?.deadline ? dayjs(todo.deadline) : null,
    });
  }, [isModalOpen]);
  console.log(form)

  return (
    <>
      <Modal
        title={titleModal}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        // onOk={() => handleModalTodo(currentTodo!)}
        onCancel={() => handleCancel(false)}
        width={760}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinishFailed={handleFiinishFailed}
          onFinish={handleFiinish}
        >
          <Form.Item
            rules={[
              { required: true, message: "Заполните название" },
              { min: 4, message: "Минимум 4 символа в названии" },
              { max: 64, message: "Максимум 64 символа в названии" },
            ]}
            name="title"
            label="Название"
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Описание">
            <TextArea />
          </Form.Item>

          <div style={{ display: "flex", gap: "12px" }}>
            <Form.Item name="executorId" label="Исполнитель">
              <Select style={{ width: 350 }} />
            </Form.Item>

            <Form.Item name="status" label="Статус">
              <Select style={{ width: 350 }} />
            </Form.Item>
          </div>

          <Form.Item name="deadline" label="Дэдлайн">
            <DatePicker style={{ width: 712 }} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form>
      </Modal>
    </>
  );
};

