import TodoItem from "./TodoItem"
import { deleteTodo, editTodo } from "../api/requests";
import { Todo, TodoInfo, TodoFilter } from "../types/types";
import TodoFilters from "./TodoFilters";
import { Table } from 'antd';

type Props = {
  setFilter: (filter: TodoFilter) => void;
  filter: TodoFilter;
  TodoInfo: TodoInfo;
  todos: Todo[];
  getLoadData: () => void;
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
  },
];

 

export default function TodoList({setFilter, filter, TodoInfo, todos, getLoadData}:Props){


  const backlogTodos = todos
    .filter(todo => todo.status == 'backlog' )

  const inSprintTodos = todos
    .filter(todo => todo.status != 'backlog' )

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
  console.log(todos)
    return (
      <>
        {/* <TodoFilters
          setFilter={setFilter}
          filter={filter}
          TodoInfo={TodoInfo}
        /> */}
        <p>Спринт {inSprintTodos.length} задач</p>
        <Table 
          dataSource={inSprintTodos} 
          columns={columns} 
          pagination={false}
          showHeader={false}
        />
        <p>Бэклог: {backlogTodos.length} задач</p>
        <Table 
          dataSource={backlogTodos} 
          columns={columns} 
          pagination={false}
          showHeader={false}
        />
      </>
    );
}