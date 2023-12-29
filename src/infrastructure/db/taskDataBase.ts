import { Task } from "../../core/domain/entities/task";
import { TaskList } from "../../core/domain/entities/taskList";
import TaskDao from "../repository/taskDao";

export default class TaskDataBase implements TaskDao {
    
    tasksDB = new Array<Task>();
    tasksListOBJ: TaskList;
  
    constructor(tasksListOBJ: TaskList){
        this.tasksListOBJ = tasksListOBJ;
        this.tasksDB = this.tasksListOBJ.tasks
    };
  
  
    //Insert or replace
    saveTasks(tasks: Array<Task>) {
        this.tasksDB = tasks;
    };
  
    //DELETE FROM tasks
    deleteAllTasks() {
        this.tasksDB = []
    };
  
    //SELECT * FROM tasks
    getTasks() {
        return this.tasksDB
    };
  }