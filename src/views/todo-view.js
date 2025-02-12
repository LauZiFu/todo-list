import { MAXPRIORITY, MINPRIORITY } from "../utils/priority.js";
import { addChildren, getRGBColor } from "../utils/dom-util.js";


export default class TodoView{

    constructor(todoItem){
        this.todoItem = todoItem;
    }
    
    render(){
        const todoDiv = document.createElement("div");
        const todoTitle = document.createElement("h2");
        const description = document.createElement("p")
        const priorityLogo = document.createElement("span");
        const checkBox = document.createElement("input");
        
        todoDiv.classList.toggle("todo-item");
        checkBox.setAttribute("type", "checkbox");
        todoTitle.textContent = this.todoItem.title;
        priorityLogo.textContent = "#";
        description.textContent = this.todoItem.description;
        priorityLogo.style.color = getRGBColor(this.todoItem.priority, MAXPRIORITY, MINPRIORITY);
        
        addChildren(todoDiv, [todoTitle, description, checkBox, priorityLogo]);
        return todoDiv;
    }
}
