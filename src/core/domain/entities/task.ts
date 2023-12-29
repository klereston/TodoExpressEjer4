export class Task {
    id: number;
    name: string;
    completed: boolean;

    constructor(id: number, name: string, completed: boolean){
            this.id = id
            this.name = name
            this.completed = completed
    }
}