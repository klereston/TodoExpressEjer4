"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepositoryImpl = void 0;
class TaskRepositoryImpl {
    constructor(dtosImpl) {
        this.dtosImpl = dtosImpl;
    }
    createTask(newTask) {
        this.dtosImpl.createTask(newTask);
        return newTask;
    }
    ;
    deleteTask(taskToDelete) {
        this.dtosImpl.deleteTask(taskToDelete);
        return taskToDelete;
    }
    ;
    updateTask(taskToUpdate) {
        this.dtosImpl.updateTask(taskToUpdate);
        return taskToUpdate;
    }
    ;
}
exports.TaskRepositoryImpl = TaskRepositoryImpl;
