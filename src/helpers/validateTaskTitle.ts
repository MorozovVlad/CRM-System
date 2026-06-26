export function validateTaskTitle(title){
    return title.trim().length > 64 || title.trim().length < 2
}