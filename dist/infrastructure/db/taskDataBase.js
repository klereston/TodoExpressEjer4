"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskDataBase {
    constructor(tasksListOBJ) {
        this.tasksDB = new Array();
        this.tasksListOBJ = tasksListOBJ;
        this.tasksDB = this.tasksListOBJ.tasks;
    }
    ;
    //Insert or replace
    saveTasks(tasks) {
        this.tasksDB = tasks;
    }
    ;
    //DELETE FROM tasks
    deleteAllTasks() {
        this.tasksDB = [];
    }
    ;
    //SELECT * FROM tasks
    getTasks() {
        return this.tasksDB;
    }
    ;
}
exports.default = TaskDataBase;
