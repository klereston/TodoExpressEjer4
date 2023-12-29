"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import {Task} from "../../core/domain/entities/task";
const taskList_1 = require("../../core/domain/entities/taskList");
const todos_json_1 = __importDefault(require("../api/todos.json"));
class ApiService {
    constructor() {
        this.arrTasks = todos_json_1.default;
        this.taskList = new taskList_1.TaskList(this.arrTasks);
    }
    getTasks() {
        return this.taskList;
    }
}
exports.default = ApiService;
