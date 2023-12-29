import ApiService from "../infrastructure/api/apiService";
import TaskDataBase from "../infrastructure/db/taskDataBase";
import { Task } from "../core/domain/entities/task";
import DTOSImpl from "../infrastructure/controllers/dtosImpl";
import { TaskRepositoryImpl } from "../application/controllers/taskRepositoryImpl";
import CreateTaskDTO from "../application/dtos/createTaskDTO";
import { TaskRepository } from "../core/repository/taskRepository";
import UpdateTaskDTO from "../application/dtos/updateTaskDTO";
import DeleteTaskDTO from "../application/dtos/deleteTaskDTO";



describe('testing TaskRepositoryImpl file', () => {
    
    //CREATE
    test('it will save a new task in the database array and return it', () => {
        
        //task obj for test
        const newTask = new Task(5, "C++", false);

        //Init ApiService
        const apiService = new ApiService();

        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();

        //Init db
        const taskDataBase = new TaskDataBase(taskList);

        //Instance controller DtosImpl DTO's repository
        const dtosImpl = new DTOSImpl(taskDataBase);

        //Instance TaskRepositoryImpl passing by param dtos CRUD
        const taskRepositoryImpl: TaskRepository = new TaskRepositoryImpl(dtosImpl);
        
        //Instance CreateTaskDTO passing the new task obj to be created 
        const createTaskDTO = new CreateTaskDTO(newTask);

        //calling the dtosImpl.createTask(newTask) function to transfer the new data to db throuth infrastructure/controller
        //dtosImpl has access to the database
        taskRepositoryImpl.createTask(createTaskDTO.getTask());
    
        //Testing if the new task is saved in the database at the lest position availeble
        expect(taskDataBase.getTasks()[taskDataBase.getTasks().length -1]).toEqual(newTask);

    })

    //UPDATE
    test('it will update a task in the database array and return it', () => {
        
        //Init ApiService
        const apiService = new ApiService();

        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();

        //Init db
        const taskDataBase = new TaskDataBase(taskList);

        //Instance controller DtosImpl DTO's repository
        const dtosImpl = new DTOSImpl(taskDataBase);

        //Instance TaskRepositoryImpl passing by param dtos CRUD
        const taskRepositoryImpl: TaskRepository = new TaskRepositoryImpl(dtosImpl);
        
        //task obj for test
        //getting an random task from database to update 
        const taskToUpdate = taskDataBase.getTasks()[2];

        //updating values
        taskToUpdate.id = 123;
        taskToUpdate.name = "Pascal";
        taskToUpdate.completed = true;

        //Instance CreateTaskDTO passing the new task obj to be created 
        const updateTaskDTO = new UpdateTaskDTO(taskToUpdate);

        //calling the dtosImpl.updateTask(updateTask) function to transfer the new data to db throuth infrastructure/controller
        //dtosImpl has access to the database
        taskRepositoryImpl.updateTask(updateTaskDTO.getTask());
    
        //Testing if the new task is saved in the database at the lest position availeble
        expect(taskDataBase.getTasks()[2]).toEqual(taskToUpdate);

    })

    //DELETE
    test('it will delete a task in the database array and return it', () => {

        //Init ApiService
        const apiService = new ApiService();

        //get an obj with list of tasks by default with data
        const taskList = apiService.getTasks();

        //Init db
        const taskDataBase = new TaskDataBase(taskList);

        //Instance controller DtosImpl DTO's repository
        const dtosImpl = new DTOSImpl(taskDataBase);

        //Instance TaskRepositoryImpl passing by param dtos CRUD
        const taskRepositoryImpl: TaskRepository = new TaskRepositoryImpl(dtosImpl);

        //task obj for test
        //getting an random task from database to delete
        const taskToDelete = taskDataBase.getTasks()[1];
        
        //Instance deleteTaskDTO passing the new task obj to be deleted
        const deleteTaskDTO = new DeleteTaskDTO(taskToDelete);

        //calling the dtosImpl.deleteTask(taskToDelete) function to transfer the new data to db throuth infrastructure/controller
        //dtosImpl has access to the database
        taskRepositoryImpl.deleteTask(deleteTaskDTO.getTask());
    
        //Testing if the new task is saved in the database at the lest position availeble
        expect(taskDataBase.getTasks().includes(taskToDelete)).toBe(false);

    })
});