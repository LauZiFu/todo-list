import { MAXPRIORITY, MINPRIORITY } from "../utils/priority.js";
import { addChildren, getRGBColor, createButton, getDOMtodoID } from "../utils/dom-util.js";
import { ProjectsControl } from "../controllers/projects-control.js";
import logMessage from "../utils/logger.js";


export default class TodoView{

    static render(todoItem){
        if(!todoItem) {
            logMessage("Todo Item does not exist in DOM") 
            return false;
        }

        const todoDiv = document.createElement("div");
        const todoTitle = document.createElement("h2");
        const description = document.createElement("p")
        const priorityLogo = document.createElement("span");
        const checkBox = document.createElement("input");
        const actionContianer = document.createElement("div");

        todoDiv.dataset.key = todoItem.id;
        todoDiv.id = getDOMtodoID(todoItem.id);

        actionContianer.classList.toggle("actions");
        todoDiv.classList.toggle("todo-item");
        checkBox.setAttribute("type", "checkbox");
        todoTitle.textContent = todoItem.title;
        priorityLogo.textContent = "#";
        description.textContent = todoItem.description;
        priorityLogo.style.color = getRGBColor(todoItem.priority, MAXPRIORITY, MINPRIORITY);
        
        const deleteBtn = createButton({textContent:"Delete", callback: (event) => {
            // Must parse int before reading.
            let projectId = parseInt(event.target.closest(".project").dataset.key);
            let todoId = parseInt(event.target.closest(".todo-item").dataset.key);
            ProjectsControl.removeTodo(projectId, todoId);
        }});

        addChildren(actionContianer, [checkBox, priorityLogo, deleteBtn]);
        addChildren(todoDiv, [todoTitle, description, actionContianer]);

        return todoDiv;
    }

    static remove(todoId){
        const todoDiv = document.getElementById(getDOMtodoID(todoId));
        if(todoDiv) todoDiv.remove();
    }
}