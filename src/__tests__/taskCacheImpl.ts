import ApiService from "../infrastructure/api/apiService";
import TaskDataBase from "../infrastructure/db/taskDataBase";
import { Task } from "../core/domain/entities/task";
import TaskCacheImpl from "../infrastructure/cache/taskCacheImpl";

describe('Testing file TaskCacheImpl', () => {
    
    //Create
    test('this test will create a new task if not exists',() => {
        //task obj for test
        const newTask = new Task(Math.random(), "Rust", false);

        //Init ApiService
        const apiService = new ApiService();

        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();

        //Init db with api data
        const taskDataBase = new TaskDataBase(taskList);
       
        //Implements task chache with data from database 
        const taskCacheImpl = new TaskCacheImpl(taskDataBase.getTasks())
       
        //Testing if exist Task In Cache (return true if exist) else (return false and save in cache and database)
        expect(taskCacheImpl.saveTaskInCache(newTask)).toBe(true);
        
   })
    
    //Create
    test('this test will create a new task and return false after checking if already exists',() => {
         //task obj for test
         const newTask = new Task(Math.random(), "Java", false);

         //Init ApiService
         const apiService = new ApiService();
 
         //get an obj with list of tasks by default with data
         const taskList = apiService.getTasks();
 
         //Init db with api data
         const taskDataBase = new TaskDataBase(taskList);
        
         //Implements task chache with data from database 
         const taskCacheImpl = new TaskCacheImpl(taskDataBase.getTasks())
        
         //Testing if exist Task In Cache (return true if exist) else (return false and save in cache and database)
         expect(taskCacheImpl.existTaskInCache(newTask)).toBe(true);
         
    })

     //Unique Task
     test('Testing Task is NOT unique',() => {
        //task obj for test
        const newTask = new Task(Math.random(), "Java", false);

        //Init ApiService
        const apiService = new ApiService();

        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();

        //Init db with api data
        const taskDataBase = new TaskDataBase(taskList);
       
        //Implements task chache with data from database 
        const taskCacheImpl = new TaskCacheImpl(taskDataBase.getTasks())
       
        //Testing if exist Task In Cache (return true if exist) else (return false and save in cache and database)
        expect(taskCacheImpl.includeTask(newTask)).toBe(true);
        
   })
})