import { Task } from "../../core/domain/entities/task";
import TaskCache from "../repository/taskCache";


export default class TaskCacheImpl implements TaskCache {
    
    arrayListDB: Task[] = new Array<Task>();
    tasksCache: Task[] = new Array<Task>();
    
  
    constructor(arrayListDB: Array<Task>){ 
        this.arrayListDB = arrayListDB 
        
        //populating the cache with the database in the instance
        this.arrayListDB.forEach(element => {
          this.tasksCache.push(element)
        });
    }
    
    
    
    includeTask(task: Task){        
      let res: boolean = false
      this.tasksCache.forEach((element) => {
            if(element.name === task.name){
              res = true
            } else {
              if(res !== true){
                res = false
              }
            }
        })
        return res
    }
  
    private createTaskInCache(task: Task) {
        this.tasksCache.push(task)
            return true
    }

    private deleteTaskFromCache(task: Task){
      const tc = this.tasksCache.filter((e)=>{
        return e.id !== task.id
      })
      this.tasksCache.length = 0
      tc.forEach(e => this.tasksCache.push(e))
      return true
    }
   
  
    existTaskInCache(task: Task){
      const exist = this.includeTask(task)
      if(exist === true){
        return true
      } 
        return false
    }
  
    saveTaskInCache(task: Task){
        return this.createTaskInCache(task)
    }
  
    deleteTaskInCache(task: Task){
        return this.deleteTaskFromCache(task)
    };
  
    getTasksFromCache(arr: Task[]){
        return arr
    };
  
    
  }