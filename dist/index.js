"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./routes/todo"));
//CREATE EXPRESS APP
const exp = (0, express_1.default)();
// middleware transform the req.body to json
exp.use(express_1.default.json());
exp.use(express_1.default.urlencoded());
exp.use(express_1.default.static('public'));
const PORT = 3000;
//CREATE END POINT                      (user: ping, app: pong)
exp.use('/api/todos', todo_1.default);
// Add this error handling middleware
/*exp.use((_req, res) => {
  console.error();
  res.status(500).send('LALALLALALALSomething went wrong');
});*/
exp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
/*
import App from "./application/app"
import { Task } from "./core/domain/entities/task"
//INSTANCES AND MENU APP
const CHOICES: Array<string> = ['Exit', 'create_task', 'update_task', 'delete_task', 'show_tasks']

const messages: { name: string, completed: boolean } = {
    name: '',
    completed: false
}

//type index = number | unknown;
const taskToUpdate: {i: number} = {
    i: -1
}

const taskToDelete: {i: number} = {
    i: -1
}


const app = new App()



function menuView(){
    console.clear()
    console.log('============================================')
    console.log('Choose one option: ')
    CHOICES.forEach((e, i)=>{
        console.log(i +"."+ e )
    })
    console.log('============================================')

}

const menu = () => {
    return new Promise((resolve):void => {
        
        menuView()
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        readline.question("", (answer:string)=>{
            readline.close()
            resolve(answer)
        })
    })
}

const startMenu = async (app:App) => {
    const answer = await menu()

   switch (answer) {
    case '0':
        //Exit
        console.log(CHOICES[0])
        break;
    case '1':
        console.log(CHOICES[1])
        createTaskTodo(app)
        break;
    case '2':
        console.log(CHOICES[2])
        updateTaskTodo(app)
        break;
    case '3':
        console.log(CHOICES[3])
        deleteTaskTodo(app)
        break;
    case '4':
        console.log(CHOICES[4])
        showDatabase()
        break;
    default:
        errorMenu()
        break;
   }
}

const e = () => {
    return new Promise((resolve):void=>{
        console.log('Error input: type an option number between 1 to 4 or 0 to exit')
        resolve(1)
    })
}

const errorMenu = async () =>{
    await e()
    await pause()
    await startMenu(app)
}

const pause = () => {
    return new Promise((resolve):void=>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Press ENTER to continue...', (m: string)=>{
            readline.close()
            resolve(m)
        })
        
    })
}

const createTaskTodoInputTitle = () => {
    return new Promise((resolve):void => {
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question("Enter the title task: ", (message:string)=>{
            messages.name = message
            readline.close()
            resolve(messages)
        })
    })
}

const createTaskTodoInputCompleted = () => {
    return new Promise((resolve, reject):void => {
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question("The task is completed (true or false): ", (answer:string)=>{
            readline.close()
            switch (answer) {
                case 'true':
                    messages.completed = Boolean(answer)
                    break;
                case 'false':
                    messages.completed = Boolean(answer)
                    break;
            
                default:
                    reject('Error: the task can NOT be created, type (true or false) to create this task')
                    break;
            }
            resolve(messages)
        })
    })
}
    
function createTaskTodoView(){
    console.clear()
    console.log('============================================')
    console.log('Create a new Task')
    console.log('============================================')
}

const createTaskTodo = async (app:App) => {
        
        createTaskTodoView()
        await createTaskTodoInputTitle()
        
        try {
            await createTaskTodoInputCompleted()
            const id = Math.random(); //generate id, prevent create a task with the same id.
            const task = new Task(id, messages.name, messages.completed);
            
            //Checking the task.name doesn't exist.
            const exT = app.existTask(task);
    
            if(exT === true){
                console.log("Can Not save this task, This Title Task already exist!")
            }
            if(exT === false){
                app.saveTaskInCache(task)
                app.createTask(task)
                console.log("The task was added successfuly")
            }
    
            //press enter to continue
            await pause()
            
            //go back to menu
            await startMenu(app)

        } catch (error) {
            console.log(error)
            await pause()
            await startMenu(app)
        }
         
}



const updateTaskTodoInput = () => {
    return new Promise((resolve)=>{
        updateTaskMenu()

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('', (e:string)=>{
            readline.close()
            taskToUpdate.i = Number(e)
            resolve(e)
        })

    })
}

function updateTaskMenu(){
    const listOfTasks = app.getAllTasks();
    const tasksTitles: Array<String> = listOfTasks.map(task => "Task: " + task.name + ", id:" + task.id + ", completed: " + task.completed);
        console.clear()
        console.log('============================================')
        console.log('Choose a task to update?')
        tasksTitles.forEach((e, i)=>{
            console.log(i +"."+ e )
        })
        console.log('============================================')
}

const updateTaskTodo = async (app:App) =>{
    
    const listOfTasks = app.getAllTasks();

    await updateTaskTodoInput()
    
    //find the task object in db by index
    await updateTaskInputTitle(listOfTasks[taskToUpdate.i])
    
    try {
        await updateTaskInputCompleted()
        const task = new Task(Math.random(), messages.name, true)
        const exT = app.existTask(task);

        if(exT === true){
            console.log("Can Not update this task, This Title Task already exist!")
        }
        if(exT === false){
            //Update the task with new data if the title(name) doesn't exist.
            listOfTasks[taskToUpdate.i].name = messages.name
            listOfTasks[taskToUpdate.i].completed = messages.completed
            app.updateTask(listOfTasks[taskToUpdate.i])
            console.log("The task was updated successfuly")
        }

        await pause()
        await startMenu(app)
        
    } catch (error) {
        console.log(error)
        await pause()
        await startMenu(app)
    }
          
}


const updateTaskInputTitle = (task: Task) => {
    return new Promise ((resolve)=>{
        console.clear()
        console.log('============================================')
        console.log('UPDATE TASK: title:'+ task.name + '  id:'+ task.id + '  completed:' + task.completed)
        console.log('============================================')
        

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`Update: title -> `, (answer: string)=>{
            readline.close()
            messages.name = answer
            resolve(answer)
        })
    })
}

const updateTaskInputCompleted = () => {
    return new Promise ((resolve, reject)=>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question(`Update: completed? (true or false) -> `, (answer: string)=>{
            readline.close()
            switch (answer) {
                case 'true':
                    messages.completed = Boolean(answer)
                    break;
                case 'false':
                    messages.completed = Boolean(answer)
                    break;
            
                default:
                    reject('Error: the task can NOT update, type true or false to complete update this task')
                    break;
            }
            
            resolve(answer)
        })
    })
}


function deleteTaskTodoView () {
    const listOfTasks = app.getAllTasks();
    const tasksTitles: Array<String> = listOfTasks.map(task => "Task: " + task.name + ", id:" + task.id + ", completed: " + task.completed);
    console.clear()
    console.log('============================================')
    console.log('Choose a task to delete: ')
    tasksTitles.forEach((e, i)=>{
        console.log(i +"."+ e )
    })
    console.log('============================================')
}


const deleteTaskTodoInput = () => {
    return new Promise((resolve)=>{
        deleteTaskTodoView()

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question('Choose the number of the task to delete: ', (answer:string)=>{
            readline.close()
            taskToDelete.i = Number(answer)
            resolve(answer)
        })
    })
}

const deleteTaskTodo = async (app:App) => {
    await deleteTaskTodoInput()
    app.deleteTask(app.getAllTasks()[taskToDelete.i])
    console.log('Task deleted successfuly.')
    await pause()
    await startMenu(app)
    
}

function databaseView () {
    const listOfTasks = app.getAllTasks();
    const tasksTitles: Array<String> = listOfTasks.map(task => "Task: " + task.name + ", id:" + task.id + ", completed: " + task.completed);
    console.clear()
    console.log('============================================')
    console.log('Choose a task to delete: ')
    tasksTitles.forEach((e, i)=>{
        console.log(i +"."+ e )
    })
    console.log('============================================')
}

const showDatabase = async () => {
    console.clear()
    console.log("DATA_BASE: ")
    databaseView()
    //console.log(app.getAllTasks())
    await pause()
    await startMenu(app)
}

//START CLI
startMenu(app)
*/
