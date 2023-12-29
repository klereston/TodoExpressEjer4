import { Task }from "../../core/domain/entities/task";
import { TaskList } from "../../core/domain/entities/taskList";

export default interface TaskService {
    //GET "tasks from my local api"
    getTasks: (arr: TaskList) => TaskList;
    arrTasks:Array<Task>
}