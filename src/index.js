import TodoItem from "./model/todo-item";
import Project from "./model/project";

class Arr {
    arr = {};

    insert(id, value){
        this.arr[id] = value;
    }

    delete(id){
        delete this.arr[id];
    }
}

let todo1 = new TodoItem({title:"lol", dueDate:new Date()});
console.log(todo1);

const project1 = new Project({name:"Lol", description:"haha", dataStructure:new Arr()});

project1.addTodo(todo1);
console.log(project1);

project1.removeTodo(todo1.id);
console.log(project1.json());