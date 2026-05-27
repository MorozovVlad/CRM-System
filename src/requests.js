export async function getAllData() {
    try{
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
        return count_tasks
    }catch(err){
        alert(err)
    }
    
}

export async function getData(filter) {
    try{
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
        return data_json.data
    }catch(err){
        alert(err)
    }
}
    
export async function addTaskServer(newTask) {
    try{
        let data = await fetch('https://easydev.club/api/v1//todos',{
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
        let data = await fetch(`https://easydev.club/api/v1//todos/${id}`,{
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