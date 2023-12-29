import { TaskRepositoryImpl } from "./controllers/taskRepositoryImpl";
import CreateTaskDTO from "./dtos/createTaskDTO";
import DeleteTaskDTO from "./dtos/deleteTaskDTO";
import UpdateTaskDTO from "./dtos/updateTaskDTO";
import  { TaskRepository } from "../core/repository/taskRepository"
import ApiService from "../infrastructure/api/apiService";
import TaskDataBase from "../infrastructure/db/taskDataBase";
import { Task } from "../core/domain/entities/task.js";
import DTOSImpl from "../infrastructure/controllers/dtosImpl";
import TaskCacheImpl from "../infrastructure/cache/taskCacheImpl";


//Init the array arrTasks from Api
export default class App {

    //----init infrastructre data----/
    //Init ApiService
    apiService = new ApiService()
  
    //get an obj with list of tasks by default with data
    taskList = this.apiService.getTasks()
  
    //Init db
    taskDataBase = new TaskDataBase(this.taskList)
  
    //Instance controller DtosImpl DTO's repository
    dtosImpl = new DTOSImpl(this.taskDataBase);
  
    //Instance Cache repository
    taskCacheImpl = new TaskCacheImpl(this.taskDataBase.getTasks());
  
    //---finish infrastructre data--/
  
    //----init core domain ----/
    //create data classes Task and TaskList as model for App
    //instances: TaskRepository and implements the methods in TaskRepositoryImpl
    //---finish core domain --/
  
    //---init application---/
    //instance: taskRepositoryImpl passing by param the db and the crudDTO
    taskRepositoryImpl: TaskRepository = new TaskRepositoryImpl(this.dtosImpl);
    //---finish application---/
    
    //-- PRIVATE CRUD ONLY ACCESS BY PUBLIC CACHE FUNCTIONS--/
    //Save task in database
    createTask(newTask: Task){
        const createTaskDTO = new CreateTaskDTO(newTask);
        this.taskRepositoryImpl.createTask(createTaskDTO.getTask());
    }
  
    //Delete task in database
    deleteTask(taskToDelete: Task){
        const deleteTaskDTO = new DeleteTaskDTO(taskToDelete);
        this.taskRepositoryImpl.deleteTask(deleteTaskDTO.getTask());
    }
     
    //Update task in database
    updateTask(taskToUpdate: Task){
        const taskToUpdateDTO = new UpdateTaskDTO(taskToUpdate);
        this.taskRepositoryImpl.updateTask(taskToUpdateDTO.getTask());
    }
  
  
    //---USING CACHE (EXER: MEMOIZE)---/
    existTask(newTask: Task){
        if(this.taskCacheImpl.existTaskInCache(newTask) === true){
            return true
        } else if(this.taskCacheImpl.existTaskInCache(newTask) === false) {
            return false
        }
        return false
    }
  
    //save task in cache
    saveTaskInCache(newTask: Task){
        this.taskCacheImpl.saveTaskInCache(newTask)
    }

    //delete task in cache
    deleteTaskInCache(newTask: Task){
        this.taskCacheImpl.deleteTaskInCache(newTask)
    }
  
    getAllTasks(): Array<Task>{
        return this.taskDataBase.getTasks();
    }
  
  }