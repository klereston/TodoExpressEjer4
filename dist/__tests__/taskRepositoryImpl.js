"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiService_1 = __importDefault(require("../infrastructure/api/apiService"));
const taskDataBase_1 = __importDefault(require("../infrastructure/db/taskDataBase"));
const task_1 = require("../core/domain/entities/task");
const dtosImpl_1 = __importDefault(require("../infrastructure/controllers/dtosImpl"));
const taskRepositoryImpl_1 = require("../application/controllers/taskRepositoryImpl");
const createTaskDTO_1 = __importDefault(require("../application/dtos/createTaskDTO"));
const updateTaskDTO_1 = __importDefault(require("../application/dtos/updateTaskDTO"));
const deleteTaskDTO_1 = __importDefault(require("../application/dtos/deleteTaskDTO"));
describe('testing TaskRepositoryImpl file', () => {
    //CREATE
    test('it will save a new task in the database array and return it', () => {
        //task obj for test
        const newTask = new task_1.Task(5, "C++", false);
        //Init ApiService
        const apiService = new apiService_1.default();
        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();
        //Init db
        const taskDataBase = new taskDataBase_1.default(taskList);
        //Instance controller DtosImpl DTO's repository
        const dtosImpl = new dtosImpl_1.default(taskDataBase);
        //Instance TaskRepositoryImpl passing by param dtos CRUD
        const taskRepositoryImpl = new taskRepositoryImpl_1.TaskRepositoryImpl(dtosImpl);
        //Instance CreateTaskDTO passing the new task obj to be created 
        const createTaskDTO = new createTaskDTO_1.default(newTask);
        //calling the dtosImpl.createTask(newTask) function to transfer the new data to db throuth infrastructure/controller
        //dtosImpl has access to the database
        taskRepositoryImpl.createTask(createTaskDTO.getTask());
        //Testing if the new task is saved in the database at the lest position availeble
        expect(taskDataBase.getTasks()[taskDataBase.getTasks().length - 1]).toEqual(newTask);
    });
    //UPDATE
    test('it will update a task in the database array and return it', () => {
        //Init ApiService
        const apiService = new apiService_1.default();
        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();
        //Init db
        const taskDataBase = new taskDataBase_1.default(taskList);
        //Instance controller DtosImpl DTO's repository
        const dtosImpl = new dtosImpl_1.default(taskDataBase);
        //Instance TaskRepositoryImpl passing by param dtos CRUD
        const taskRepositoryImpl = new taskRepositoryImpl_1.TaskRepositoryImpl(dtosImpl);
        //task obj for test
        //getting an random task from database to update 
        const taskToUpdate = taskDataBase.getTasks()[2];
        //updating values
        taskToUpdate.id = 123;
        taskToUpdate.name = "Pascal";
        taskToUpdate.completed = true;
        //Instance CreateTaskDTO passing the new task obj to be created 
        const updateTaskDTO = new updateTaskDTO_1.default(taskToUpdate);
        //calling the dtosImpl.updateTask(updateTask) function to transfer the new data to db throuth infrastructure/controller
        //dtosImpl has access to the database
        taskRepositoryImpl.updateTask(updateTaskDTO.getTask());
        //Testing if the new task is saved in the database at the lest position availeble
        expect(taskDataBase.getTasks()[2]).toEqual(taskToUpdate);
    });
    //DELETE
    test('it will delete a task in the database array and return it', () => {
        //Init ApiService
        const apiService = new apiService_1.default();
        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();
        //Init db
        const taskDataBase = new taskDataBase_1.default(taskList);
        //Instance controller DtosImpl DTO's repository
        const dtosImpl = new dtosImpl_1.default(taskDataBase);
        //Instance TaskRepositoryImpl passing by param dtos CRUD
        const taskRepositoryImpl = new taskRepositoryImpl_1.TaskRepositoryImpl(dtosImpl);
        //task obj for test
        //getting an random task from database to delete
        const taskToDelete = taskDataBase.getTasks()[1];
        //Instance deleteTaskDTO passing the new task obj to be deleted
        const deleteTaskDTO = new deleteTaskDTO_1.default(taskToDelete);
        //calling the dtosImpl.deleteTask(taskToDelete) function to transfer the new data to db throuth infrastructure/controller
        //dtosImpl has access to the database
        taskRepositoryImpl.deleteTask(deleteTaskDTO.getTask());
        //Testing if the new task is saved in the database at the lest position availeble
        expect(taskDataBase.getTasks().includes(taskToDelete)).toBe(false);
    });
});
