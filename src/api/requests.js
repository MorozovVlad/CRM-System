export async function getTasks(filter) {
    let request = filter == "all" ? "https://easydev.club/api/v1/todos" : `https://easydev.club/api/v1/todos?filter=${filter}`

    const data = await fetch(request)
    if(!data.ok){
        throw new Error();
    }
    const dataJson = await data.json()
    return dataJson
}
    
export async function addTask(newTask) {
    const data = await fetch('https://easydev.club/api/v1/todos',{
        method: 'POST',
            body: JSON.stringify(newTask)
    })
    if (!data.ok) {
      throw new Error();
    }
}

export async function deleteTask(id) {
    const data = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: 'DELETE',
    })
    if (!data.ok) {
      throw new Error();
    }
}

export async function editTask(newTask, id) {
    const data = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: "PUT",
        body: JSON.stringify(newTask)
    })
    if (!data.ok) {
      throw new Error();
    }
}