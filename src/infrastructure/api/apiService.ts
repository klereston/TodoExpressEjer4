//import {Task} from "../../core/domain/entities/task";
import {TaskList} from "../../core/domain/entities/taskList";
import TaskService from "../../infrastructure/repository/taskService";
import todos from "../api/todos.json";

export default class ApiService implements TaskService {


    arrTasks = todos

    taskList: TaskList = new TaskList(this.arrTasks); 

    getTasks(): TaskList  {
        return this.taskList
    }
    
}
