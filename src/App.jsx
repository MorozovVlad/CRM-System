import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] = useState([])


  async function getData() {
    setTasks([])
    let data = await fetch('https://easydev.club/api/v1//todos')
    let data_json = await data.json()
    data_json.data.map(item => {
      const newTask = {
        id : item.id,
        title : item.title,
        isDone : item.isDone,
      }
      setTasks(prev => [...prev ,newTask])
    })
  }


  useEffect(()=>{
    setTasks([])
    getData()
  }, [])


  async function addTask(newTaskTitle){
    if(newTaskTitle.length>64 || newTaskTitle.length<2){
      alert("Длина названия задачи должна быть от 2 до 64 символов")
      return
    }
    const newTask = {
      title: newTaskTitle,
      isDone: false,
    }
    async function addTaskServer() {
      let data = await fetch('https://easydev.club/api/v1//todos',{
        method: 'POST',
        body: JSON.stringify(newTask)
      })
    }
    await addTaskServer()
    await getData()
  }

  async function deleteTask(id){
    async function deleteTaskServer() {
      let data = await fetch(`https://easydev.club/api/v1//todos/${id}`,{
        method: 'DELETE',
      })
    }
    await deleteTaskServer()
    await getData()
  }

  async function editTask(id, newTitle, isDone){
    if(newTitle.length>64 || newTitle.length<2){
      alert("Длина названия задачи должна быть от 2 до 64 символов")
      return
    }
    const newTask = {
      "isDone": isDone,
      "title": newTitle
    }
    async function editTask() {
      await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: "PUT",
        body: JSON.stringify(newTask)
      })
    }
    await editTask()
    await getData()
  }


  return (
    <div className='main'>
      <AddTask addTask={addTask}/>
      <TodoList editTask={editTask} deleteTask={deleteTask} tasks={tasks}/>
    </div>
  )
}

export default App
