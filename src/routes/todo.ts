import express from "express";
import App from "../application/app";
import { Task } from "../core/domain/entities/task";

const app = new App();
const router = express.Router()

router.get('/alltasks', (_req, res) => {
    res.status(200).send(app.getAllTasks())
})

router.get('/iconUpdate', (_req, res) => {
    res.status(200).sendFile(__dirname + '/public/iconUpdate.png')
})

router.get('/iconDelete', (_req, res) => {
    res.status(200).sendFile(__dirname + '/public/iconDelete.png')
})

router.get('/', (_req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html')
})

/*POST {
    "id": 0,
    "title": "pepe",
    "completed": false
  }*/

router.post('/', (req, res) => {
    try {
        const id = Math.random(); //generate id, prevent create a task with the same id.
        const task = new Task(id, req.body.name, req.body.completed)
       
    console.log(task)
            //Checking the task.name doesn't exist.  
            const exT = app.existTask(task);
    
            if(exT === true){
                console.log("Can Not save this task, This Title Task already exist!")
                res.send("Can Not save this task, This Title Task already exist!")
            }
            if(exT === false){
                app.saveTaskInCache(task)
                app.createTask(task)
                res.status(200).send("The task was added successfuly")
            }
        
    } catch (error: any) {
        res.status(400).send(error.message)
    }

})

/*{
    "id": 0.12312312312, 
    "name": "Java", 
    "completed": true
}*/

router.put('/', (req, res) => {
    console.log('estoy en put!')
    try{
        const task = new Task(req.body.id, req.body.name, req.body.completed)
        app.updateTask(task)
        res.send("The task was updated successfuly")
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


router.delete('/', (req, res) => {
    try{
        const task = new Task(req.body.id, req.body.name, req.body.completed)
        
        app.deleteTaskInCache(task)
        app.deleteTask(task)
        console.log("The task was deleted!")
        res.send("The task was deleted!")
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

export default router
