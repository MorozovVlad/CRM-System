import { useState } from 'react'

export default function AddTask({addTask}){

    const [newTaskTitle, setNewTaskTitle] = useState("")

    // console.log(newTaskTitle)

    return(
        <div className='add-task'>
            <input placeholder='Task To Be Done...' className='input-task' onChange={e=>setNewTaskTitle(e.target.value)} value={newTaskTitle} />
            <button className='button-input' onClick={click => {addTask(newTaskTitle), setNewTaskTitle("")}} >Add</button>
        </div> 
    )
}