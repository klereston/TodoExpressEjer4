import { Task } from "./task";

export class TaskList {
    tasks: Array<Task>;

    constructor(tasks: Array<Task>){
        this.tasks = tasks
    }
}