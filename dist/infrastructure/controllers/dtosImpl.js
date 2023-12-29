"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOSImpl {
    constructor(taskDataBase) {
        this.taskDataBase = taskDataBase;
    }
    createTask(newTask) {
        const arr = this.taskDataBase.getTasks();
        //CREATE task IN tasks
        arr.push(newTask);
        this.taskDataBase.saveTasks(arr);
        return newTask;
    }
    ;
    /*deleteTask(taskToDelete: Task)  {
        const listOfTasks = this.taskDataBase.getTasks();
        const i = listOfTasks.indexOf(taskToDelete);
        if(!(i === -1)){
            //DELETE task FROM tasks
            listOfTasks.splice(i,1);
            this.taskDataBase.saveTasks(listOfTasks);
        }
        
        return taskToDelete;
    };*/
    deleteTask(taskToDelete) {
        const listOfTasks = this.taskDataBase.getTasks();
        //DELETE task FROM tasks
        const newListTasks = listOfTasks.filter((task) => {
            return task.id !== taskToDelete.id;
        });
        this.taskDataBase.saveTasks(newListTasks);
        return taskToDelete;
    }
    ;
    updateTask(taskToUpdate) {
        const listOfTasks = this.taskDataBase.getTasks();
        //UPDATE task FROM tasks
        const newListTasks = listOfTasks.map((task) => {
            if (task.id === taskToUpdate.id) {
                task = taskToUpdate;
            }
            return task;
        });
        this.taskDataBase.saveTasks(newListTasks);
        return taskToUpdate;
    }
    ;
}
exports.default = DTOSImpl;
