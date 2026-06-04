export async function getData(filter) {
    try{
        let request = ""
        switch(filter){
        case 0:
            request = "https://easydev.club/api/v1/todos"
            break
        case false:
            request = "https://easydev.club/api/v1/todos?filter=completed"
            break
        case true:
            request = "https://easydev.club/api/v1/todos?filter=inWork"
            break
        }

        if(filter == "all"){
            request = "https://easydev.club/api/v1/todos";
        }else if (filter == "completed") {
            request = "https://easydev.club/api/v1/todos?filter=completed";
        }else if (filter == "inWork") {
          request = "https://easydev.club/api/v1/todos?filter=inWork";
        }

        let data = await fetch(request)
        let data_json = await data.json()
        return data_json
    }catch(err){
        alert(err)
    }
}
    
export async function addTaskServer(newTask) {
    try{
        let data = await fetch('https://easydev.club/api/v1/todos',{
            method: 'POST',
            body: JSON.stringify(newTask)
        })
    }
    catch(err){
        alert(err)
    }
}

export async function deleteTaskServer(id) {
    try{
        let data = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
            method: 'DELETE',
        })
    }catch(err){
        alert(err)
    }

}

export async function editTaskServer(newTask, id) {
    try{
        await fetch(`https://easydev.club/api/v1/todos/${id}`,{
            method: "PUT",
            body: JSON.stringify(newTask)
        })
    }catch(err){
        alert(err)
    }
}