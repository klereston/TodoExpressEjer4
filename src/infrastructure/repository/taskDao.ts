import { Task } from "../../core/domain/entities/task";

//Implemented in ../db/TasksDataBase
export default interface TaskDao {

    //Insert or replace tasks
    saveTasks:(tasks: Array<Task>) => void;

    //DELETE FROM tasks
    deleteAllTasks: () => void;

    //SELECT * FROM tasks
    getTasks: (arr: Array<Task>) => Array<Task>;
}

