"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("../application/app"));
const task_1 = require("../core/domain/entities/task");
const app = new app_1.default();
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.status(200).send(app.getAllTasks());
});
router.get('/alltasks', (_req, res) => {
    res.status(200).send(app.getAllTasks());
});
router.get('/form', (_req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
});
/*POST {
    "id": 0,
    "title": "pepe",
    "completed": false
  }*/
router.post('/', (req, res) => {
    try {
        const id = Math.random(); //generate id, prevent create a task with the same id.
        const task = new task_1.Task(id, req.body.name, req.body.completed);
        console.log(task);
        //Checking the task.name doesn't exist.  
        const exT = app.existTask(task);
        if (exT === true) {
            res.send("Can Not save this task, This Title Task already exist!");
        }
        if (exT === false) {
            app.saveTaskInCache(task);
            app.createTask(task);
            res.status(200).send("The task was added successfuly");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
/*{
    "id": 0.12312312312,
    "name": "Java",
    "completed": true
}*/
router.put('/', (req, res) => {
    try {
        const task = new task_1.Task(req.body.id, req.body.name, req.body.completed);
        app.updateTask(task);
        res.send("The task was updated successfuly");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete('/', (req, res) => {
    try {
        const task = new task_1.Task(req.body.id, req.body.name, req.body.completed);
        app.deleteTask(task);
        //app.getAllTasks()[1]
        res.send("The task was deleted!");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = router;
