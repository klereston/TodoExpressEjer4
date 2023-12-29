"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskRepositoryImpl_1 = require("./controllers/taskRepositoryImpl");
const createTaskDTO_1 = __importDefault(require("./dtos/createTaskDTO"));
const deleteTaskDTO_1 = __importDefault(require("./dtos/deleteTaskDTO"));
const updateTaskDTO_1 = __importDefault(require("./dtos/updateTaskDTO"));
const apiService_1 = __importDefault(require("../infrastructure/api/apiService"));
const taskDataBase_1 = __importDefault(require("../infrastructure/db/taskDataBase"));
const dtosImpl_1 = __importDefault(require("../infrastructure/controllers/dtosImpl"));
const taskCacheImpl_1 = __importDefault(require("../infrastructure/cache/taskCacheImpl"));
//Init the array arrTasks from Api
class App {
    constructor() {
        //----init infrastructre data----/
        //Init ApiService
        this.apiService = new apiService_1.default();
        //get an obj with list of tasks by default with data
        this.taskList = this.apiService.getTasks();
        //Init db
        this.taskDataBase = new taskDataBase_1.default(this.taskList);
        //Instance controller DtosImpl DTO's repository
        this.dtosImpl = new dtosImpl_1.default(this.taskDataBase);
        //Instance Cache repository
        this.taskCacheImpl = new taskCacheImpl_1.default(this.taskDataBase.getTasks());
        //---finish infrastructre data--/
        //----init core domain ----/
        //create data classes Task and TaskList as model for App
        //instances: TaskRepository and implements the methods in TaskRepositoryImpl
        //---finish core domain --/
        //---init application---/
        //instance: taskRepositoryImpl passing by param the db and the crudDTO
        this.taskRepositoryImpl = new taskRepositoryImpl_1.TaskRepositoryImpl(this.dtosImpl);
    }
    //---finish application---/
    //-- PRIVATE CRUD ONLY ACCESS BY PUBLIC CACHE FUNCTIONS--/
    //Save task in database
    createTask(newTask) {
        const createTaskDTO = new createTaskDTO_1.default(newTask);
        this.taskRepositoryImpl.createTask(createTaskDTO.getTask());
    }
    //Delete task in database
    deleteTask(taskToDelete) {
        const deleteTaskDTO = new deleteTaskDTO_1.default(taskToDelete);
        this.taskRepositoryImpl.deleteTask(deleteTaskDTO.getTask());
    }
    //Update task in database
    updateTask(taskToUpdate) {
        const taskToUpdateDTO = new updateTaskDTO_1.default(taskToUpdate);
        this.taskRepositoryImpl.updateTask(taskToUpdateDTO.getTask());
    }
    //---USING CACHE (EXER: MEMOIZE)---/
    existTask(newTask) {
        if (this.taskCacheImpl.existTaskInCache(newTask) === true) {
            return true;
        }
        else if (this.taskCacheImpl.existTaskInCache(newTask) === false) {
            return false;
        }
        return false;
    }
    //save task in cache
    saveTaskInCache(newTask) {
        this.taskCacheImpl.saveTaskInCache(newTask);
    }
    getAllTasks() {
        return this.taskDataBase.getTasks();
    }
}
exports.default = App;
