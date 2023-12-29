import {Task} from "../../core/domain/entities/task";
import {TaskRepository} from "../../core/repository/taskRepository"
import TaskDataBase from "../db/taskDataBase";


export default class DTOSImpl implements TaskRepository{
    
    taskDataBase: TaskDataBase;
    
  
    constructor(taskDataBase: TaskDataBase){ 
        this.taskDataBase = taskDataBase
    }
    
  
    createTask(newTask: Task) {
        const arr = this.taskDataBase.getTasks();
        //CREATE task IN tasks
        arr.push(newTask);
        this.taskDataBase.saveTasks(arr);
        return newTask;
    };
  
    
    /*deleteTask(taskToDelete: Task)  {
        const listOfTasks = this.taskDataBase.getTasks();       
        const i = listOfTasks.indexOf(taskToDelete);
        if(!(i === -1)){
            //DELETE task FROM tasks
            listOfTasks.splice(i,1);
            this.taskDataBase.saveTasks(listOfTasks);
        }
        
        return taskToDelete;
    };*/

    deleteTask(taskToDelete: Task)  {
        const listOfTasks = this.taskDataBase.getTasks();

        //DELETE task FROM tasks
        const newListTasks = listOfTasks.filter((task)=>{
            return task.id !== taskToDelete.id
        })
        
        this.taskDataBase.saveTasks(newListTasks)
        return taskToDelete
    };
    
  
    updateTask(taskToUpdate: Task)  {
        const listOfTasks = this.taskDataBase.getTasks();
        //UPDATE task FROM tasks
        const newListTasks = listOfTasks.map((task)=>{
            if(task.id === taskToUpdate.id){
                task = taskToUpdate;
            }
            return task
        });
        
        this.taskDataBase.saveTasks(newListTasks)
        return taskToUpdate
    };
  }
