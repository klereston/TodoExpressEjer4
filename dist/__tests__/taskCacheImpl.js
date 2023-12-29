"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiService_1 = __importDefault(require("../infrastructure/api/apiService"));
const taskDataBase_1 = __importDefault(require("../infrastructure/db/taskDataBase"));
const task_1 = require("../core/domain/entities/task");
const taskCacheImpl_1 = __importDefault(require("../infrastructure/cache/taskCacheImpl"));
describe('Testing file TaskCacheImpl', () => {
    //Create
    test('this test will create a new task if not exists', () => {
        //task obj for test
        const newTask = new task_1.Task(Math.random(), "Rust", false);
        //Init ApiService
        const apiService = new apiService_1.default();
        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();
        //Init db with api data
        const taskDataBase = new taskDataBase_1.default(taskList);
        //Implements task chache with data from database 
        const taskCacheImpl = new taskCacheImpl_1.default(taskDataBase.getTasks());
        //Testing if exist Task In Cache (return true if exist) else (return false and save in cache and database)
        expect(taskCacheImpl.saveTaskInCache(newTask)).toBe(true);
    });
    //Create
    test('this test will create a new task and return false after checking if already exists', () => {
        //task obj for test
        const newTask = new task_1.Task(Math.random(), "Java", false);
        //Init ApiService
        const apiService = new apiService_1.default();
        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();
        //Init db with api data
        const taskDataBase = new taskDataBase_1.default(taskList);
        //Implements task chache with data from database 
        const taskCacheImpl = new taskCacheImpl_1.default(taskDataBase.getTasks());
        //Testing if exist Task In Cache (return true if exist) else (return false and save in cache and database)
        expect(taskCacheImpl.existTaskInCache(newTask)).toBe(true);
    });
    //Unique Task
    test('Testing Task is NOT unique', () => {
        //task obj for test
        const newTask = new task_1.Task(Math.random(), "Java", false);
        //Init ApiService
        const apiService = new apiService_1.default();
        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();
        //Init db with api data
        const taskDataBase = new taskDataBase_1.default(taskList);
        //Implements task chache with data from database 
        const taskCacheImpl = new taskCacheImpl_1.default(taskDataBase.getTasks());
        //Testing if exist Task In Cache (return true if exist) else (return false and save in cache and database)
        expect(taskCacheImpl.includeTask(newTask)).toBe(true);
    });
});
