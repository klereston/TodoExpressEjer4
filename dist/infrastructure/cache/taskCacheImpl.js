"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskCacheImpl {
    constructor(arrayListDB) {
        this.arrayListDB = new Array();
        this.tasksCache = new Array();
        this.arrayListDB = arrayListDB;
        //populating the cache with the database in the instance
        this.arrayListDB.forEach(element => {
            this.tasksCache.push(element);
        });
    }
    includeTask(task) {
        let res = false;
        this.tasksCache.forEach((element) => {
            if (element.name === task.name) {
                res = true;
            }
            else {
                if (res !== true) {
                    res = false;
                }
            }
        });
        return res;
    }
    createTaskInCache(task) {
        this.tasksCache.push(task);
        return true;
    }
    existTaskInCache(task) {
        const exist = this.includeTask(task);
        if (exist === true) {
            return true;
        }
        return false;
    }
    saveTaskInCache(task) {
        return this.createTaskInCache(task);
    }
    deleteTaskInCache() {
        return true;
    }
    ;
    getTasksFromCache(arr) {
        return arr;
    }
    ;
}
exports.default = TaskCacheImpl;
