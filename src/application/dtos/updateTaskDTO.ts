import { Task } from "../../core/domain/entities/task";

export default class UpdateTaskDTO {
    
    //this task should come from UI/UX?!
    //by constructor?!
    task: Task;

    constructor(task: Task){
        this.task = task
    }
    
    getTask(): Task {
        return this.task;
    }
} 