import { Task } from "../../core/domain/entities/task";

//Implemented in ../db/TasksDataBase
export default interface TaskCache {

    existTaskInCache: (task: Task) => boolean;
  
    saveTaskInCache: (task: Task) => boolean;
  
    deleteTaskInCache: (task: Task) => boolean;
  
    getTasksFromCache: (arr: Array<Task>) => Array<Task>;
  }