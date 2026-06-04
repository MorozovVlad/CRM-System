export async function getData(filter) {
    let request = ""

    if(filter == "all"){
        request = "https://easydev.club/api/v1/todos";
    }else if (filter == "completed") {
        request = "https://easydev.club/api/v1/todos?filter=completed";
    }else if (filter == "inWork") {
        request = "https://easydev.club/api/v1/todos?filter=inWork";
    }

    const data = await fetch(request)
    if(!data.ok){
        throw new Error();
    }
    const dataJson = await data.json()
    return dataJson
}
    
export async function addTaskToServer(newTask) {
    const data = await fetch('https://easydev.club/api/v1/todos',{
        method: 'POST',
            body: JSON.stringify(newTask)
    })
    if (!data.ok) {
      throw new Error();
    }
}

export async function deleteTaskFromServer(id) {
    const data = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: 'DELETE',
    })
    if (!data.ok) {
      throw new Error();
    }
}

export async function editTaskOnServer(newTask, id) {
    const data = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: "PUT",
        body: JSON.stringify(newTask)
    })
    if (!data.ok) {
      throw new Error();
    }
}