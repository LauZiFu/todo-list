import { addChildren, createFormSelect } from "../utils/dom-util";
import { renderTodoItem } from "./todo-item";
import { getPriorityRange } from "../utils/priority";

class ProjectView{
    #projectDiv = document.createElement("div");
    #addTaskBtn = document.createElement("button");
    #itemsContainer = document.createElement("div");

    constructor(project, addTodoHandler){
        this.project = project;
        this.#addTaskBtn.textContent = "Add Task";
        this.#addTaskBtn.classList.toggle("add-task-btn");

        this.#addTaskBtn.addEventListener("click", ()=>{

        })
    }

    renderProject(){
        const itemDivList = this.project
            .getTodoList()
            .map((element) => renderTodoItem(element));
        
        addChildren(this.#itemsContainer, itemDivList);
        addChildren(this.#projectDiv, [itemDivList, this.#addTaskBtn]);
    }

    renderAddTodoForm(){
        const formDiv = document.createElement("form");
        const taskName = document.createElement("input");
        const actions = document.createElement("div");
        const inputDate = document.createElement("input");
        const priorityList = getPriorityRange();
    
        inputDate.setAttribute("type", "date");
    
        createFormSelect(`select${this.project.id}`, priorityList)
        actions.classList.toggle("actions");
    }
}



