import { Task } from "../../core/domain/entities/task";
import DTOSImpl from "../../infrastructure/controllers/dtosImpl";
import { TaskRepository }  from "../../core/repository/taskRepository"

export class TaskRepositoryImpl implements TaskRepository{
  
    dtosImpl: DTOSImpl

    constructor(dtosImpl: DTOSImpl){
        this.dtosImpl = dtosImpl
    }

    createTask(newTask: Task) {
        this.dtosImpl.createTask(newTask);
        return newTask;
    };

    
    deleteTask(taskToDelete: Task)  {
        this.dtosImpl.deleteTask(taskToDelete);
        return taskToDelete;
    };
    

    updateTask(taskToUpdate: Task)  {
        this.dtosImpl.updateTask(taskToUpdate);
        return taskToUpdate;
    };
}