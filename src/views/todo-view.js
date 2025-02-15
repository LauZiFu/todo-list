import { MAXPRIORITY, MINPRIORITY } from "../utils/priority.js";
import { addChildren, getRGBColor, createButton} from "../utils/dom-util.js";
import { getDOMtodoID } from "../styles/css-config.js"
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
        const actionContianer = this.#renderActions(todoItem);
        todoDiv.dataset.key = todoItem.id;
        todoDiv.id = getDOMtodoID(todoItem.id);
        todoDiv.classList.toggle("todo-item");
        todoTitle.textContent = todoItem.title;
        description.textContent = todoItem.description;
        addChildren(todoDiv, [todoTitle, description, actionContianer]);
        return todoDiv;
    }

    static #renderActions(todoItem){
        const actionContainer = document.createElement("div");
        const checkBox = document.createElement("input");
        const priorityLogo = document.createElement("span");
        actionContainer.classList.toggle("actions");
        checkBox.setAttribute("type", "checkbox");
        priorityLogo.textContent = "#";
        priorityLogo.style.color = getRGBColor(todoItem.priority, MAXPRIORITY, MINPRIORITY);

        const deleteBtn = createButton({textContent:"Delete", callback: (event) => {
            // Must parse int before reading.
            let projectId = parseInt(event.target.closest(".project").dataset.key);
            let todoId = parseInt(event.target.closest(".todo-item").dataset.key);
            ProjectsControl.removeTodo(projectId, todoId);
        }});

        checkBox.addEventListener("change", (e)=>{
            if(e.target.checked){
                todoItem.markComplete();
            } else {
                todoItem.markIncomplete();
            }
        })

        addChildren(actionContainer, [checkBox, priorityLogo, deleteBtn]);
        return actionContainer;
    }

    static remove(todoId){
        const todoDiv = document.getElementById(getDOMtodoID(todoId));
        if(todoDiv) todoDiv.remove();
    }

}