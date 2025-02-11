import { MAXPRIORITY, MINPRIORITY } from "../utils/priority.js";
import { addChildren, getRGBColor } from "../utils/dom-util.js";


export const renderTodoItem = function(todoItem){
    const todoDiv = document.createElement("div");
    const todoTitle = document.createElement("h2");
    const priorityLogo = document.createElement("span");
    const checkBox = document.createElement("input");

    todoDiv.classList.toggle("todo-item");
    checkBox.setAttribute("type", "checkbox");
    todoTitle.textContent = todoItem.title;
    priorityLogo.textContent = "#";
    priorityLogo.style.color = getRGBColor(todoItem.priority, MAXPRIORITY, MINPRIORITY);

    addChildren(todoDiv, [todoTitle, checkBox, priorityLogo]);
    return todoDiv;
}

