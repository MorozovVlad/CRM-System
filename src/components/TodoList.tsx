import { deleteTodo, addTodo } from "../api/requests";
import { Todo, TodoInfo, TodoFilter, NewTodo } from "../types/types";
import { Table } from 'antd';
import { Tag } from 'antd';
import { useState } from "react";
import TodoModal from "./TodoModal";
import { Button } from "antd";

type Props = {
  todos: Todo[];
  getLoadData: () => void;
  setSelectedTodo: (todo: number) => void
  selectedTodo: number;
};

const columns = [
  {
    title: 'Number',
    dataIndex: 'id',
    key: 'id',
    width: "10%",
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    width: "15%",
    render: (status: string) => (
      <Tag 
        style={{
        width: 100,
        textAlign: 'center',
      }}>{status}</Tag>
    ),
  },
  {
    title: 'executor',
    dataIndex: ['executor', 'name'],
    key: 'executor',
    width: "15%",
  },
  {
    title: 'deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    width: "20%",
    render: (deadline: string)=>{
      if(!deadline){
        return "-"
      }
    }
  },
];


export default function TodoList({ todos, getLoadData, setSelectedTodo, selectedTodo}:Props){
  const backlogTodos = todos.filter((todo) => todo.status == "backlog");

  const inSprintTodos = todos.filter((todo) => todo.status != "backlog");

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  function handleSelectTodo(todo: Todo) {
    setSelectedTodo(todo.id);
  }

  async function handleModalTodo(currentTodo: Todo) {
    const newTodo: NewTodo = {
      title: currentTodo?.title,
      description: currentTodo?.description,
      executorId: 1,
      status: currentTodo?.status,
      deadline: currentTodo?.deadline,
    };
    await addTodo(newTodo);
    await getLoadData();
    setIsModalOpen(false);
  }

  console.log(todos);
  return (
    <div className="todoList">
      <Button onClick={() => setIsModalOpen(true)} type="primary">
        Добавить
      </Button>
      <p>Спринт {inSprintTodos.length} задач</p>
      <Table
        className="todo-table"
        style={{ width: "100%", cursor: "pointer" }}
        dataSource={inSprintTodos}
        columns={columns}
        pagination={false}
        showHeader={false}
        rowClassName={(record) =>
          record.id === selectedTodo ? "selected-row" : ""
        }
        onRow={(todo) => ({
          onClick: () => {
            handleSelectTodo(todo);
          },
        })}
      />
      <p>Бэклог: {backlogTodos.length} задач</p>
      <Table
        style={{ width: "100%", cursor: "pointer" }}
        dataSource={backlogTodos}
        columns={columns}
        pagination={false}
        showHeader={false}
        onRow={(todo) => ({
          onClick: () => {
            handleSelectTodo(todo);
          },
        })}
      />

      <TodoModal
        titleModal="Добавить задачу"
        isModalOpen={isModalOpen}
        handleCancel={setIsModalOpen}
        getLoadData={getLoadData}
        handleModalTodo={handleModalTodo}
      />
    </div>
  );
}