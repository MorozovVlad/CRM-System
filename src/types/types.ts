export type NewTask = {
    isDone: boolean
    title: string
}

export type Task = {
    id: number
    title: string
    created: string
    isDone: boolean
}

export type CountTask = {
    all: number
    completed: number
    inWork: number
}