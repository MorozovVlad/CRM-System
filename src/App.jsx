import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] = useState([])
  const [countTasks, setCountTasks] = useState({})
  const [filter, setFilter] = useState(0)
  
  async function getAllData() {
    setCountTasks([])
    let data = await fetch('https://easydev.club/api/v1//todos')
    let data_json = await data.json()
    const count_tasks={
      all:0,
      inWork:0,
      completed:0,
    }
    data_json.data.map(item => {
      count_tasks.all++
      if(item.isDone==true){
        count_tasks.completed++
      }else{
        count_tasks.inWork++
      }
    })
    setCountTasks(count_tasks)
  }

  async function getData() {
    setTasks([])
    let request = ""
    switch(filter){
      case 0:
        request = "https://easydev.club/api/v1//todos"
        break
      case false:
        request = "https://easydev.club/api/v1//todos?filter=completed"
        break
      case true:
        request = "https://easydev.club/api/v1//todos?filter=inWork"
        break
    }
    
    let data = await fetch(request)
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
    setCountTasks([])
    getAllData()
  }, [tasks])

  useEffect(()=>{
    getData()
  }, [filter])



  async function addTask(newTaskTitle){
    if(newTaskTitle.trim().length>64 || newTaskTitle.trim().length<2){
      alert("Длина названия задачи должна быть от 2 до 64 символов")
      return
    }
    const newTask = {
      title: newTaskTitle.trim(),
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
    if(newTitle.trim().length>64 || newTitle.trim().length<2){
      alert("Длина названия задачи должна быть от 2 до 64 символов")
      return
    }
    const newTask = {
      "isDone": isDone,
      "title": newTitle.trim()
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
      <TodoList filter={filter} setFilter={setFilter} countTasks={countTasks} getData={getData} editTask={editTask} deleteTask={deleteTask} tasks={tasks}/>
    </div>
  )
}

export default App
