import { addChildren, createFormSelect, setAttributes } from "../utils/dom-util.js";
import { getPriorityRange } from "../utils/priority.js";

export default class ProjectView{
    #formDialog = document.createElement("dialog");
    #projectDiv = document.createElement("div");
    #addTodoHandler;

    constructor(project,TodoView,addTodoHandler){
        this.project = project;
        this.view = TodoView
        this.#addTodoHandler = addTodoHandler;
        this.#projectDiv.innerHTML = `<h1>${this.project.name}</h1>`
        this.#projectDiv.id = `projectId${this.project.id}`;
        const mainContainer = document.querySelector(".main-container");
                // Appends the element to the Dom
        // Must be before todo form render
        mainContainer.appendChild(this.#projectDiv);
        this.#renderAddTodoForm();
    }

    render(){
        const addTaskBtn = document.createElement("button");
        const itemsContainer = document.createElement("div");
        itemsContainer.classList.toggle("item-list-div");
        addTaskBtn.textContent = "Add Task";
        addTaskBtn.classList.toggle("add-task-btn");
        addTaskBtn.addEventListener("click", ()=>{
            this.#formDialog.showModal();
        });

        const itemDivList = this.project
            .getTodoList()
            .map((element) => new this.view(element).render());
        
        addChildren(itemsContainer, itemDivList);
        addChildren(this.#projectDiv, [itemsContainer, addTaskBtn, this.#formDialog]);
    }


    #renderAddTodoForm(){
        const formDiv = document.createElement("form");
        // Text field inputs
        const textField = document.createElement("section");
        const taskNameInput = document.createElement("input");
        const descInput = document.createElement("textarea");
        taskNameInput.placeholder = "Task name";
        taskNameInput.required = true;
        textField.classList.toggle("text-section");

        setAttributes(taskNameInput, ["name", "id"],`name${this.project.id}`);
        descInput.placeholder = "Description";
        setAttributes(descInput, ["name", "id"], `description${this.project.id}`);
        addChildren(textField, [taskNameInput, descInput]);

        // action elements
        const actions = document.createElement("section");
        const inputDate = document.createElement("input");
        const prioritySelect = createFormSelect(`select${this.project.id}`, getPriorityRange());

        inputDate.setAttribute("type", "date");
        inputDate.required = true;

        actions.classList.toggle("action-section");
        addChildren(actions, [inputDate, prioritySelect]);

        // confirmation field
        const confirmField = document.createElement("section");
        const confirmAddBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        confirmAddBtn.textContent = "Confirm";

        cancelBtn.value = "cancel";
        addChildren(confirmField, [cancelBtn, confirmAddBtn]);
        confirmField.classList.toggle("confirm-section");

        formDiv.addEventListener("submit", (e) => {
            e.preventDefault();
            this.#formDialog.returnValue = JSON.stringify({
                title: taskNameInput.value,
                dueDate: inputDate.value,
                priority: prioritySelect.lastChild.value,
                description: descInput.value
            });
            console.log(this.#formDialog.returnValue);
            this.#formDialog.close()
        });

        // Cancel button triggers a close event
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.#formDialog.close("cancel");
        });

        // When form is submitted or closed
        this.#formDialog.addEventListener("close", ()=>{
            if(this.#formDialog.returnValue !== "cancel"){
                let response = JSON.parse(this.#formDialog.returnValue);
                response.priority = parseInt(response.priority);
                this.#addTodoHandler(this.project.id,response);
            }
            formDiv.reset();
        });

        addChildren(formDiv, [textField, actions, confirmField]);
        this.#formDialog.appendChild(formDiv);
    }
}



