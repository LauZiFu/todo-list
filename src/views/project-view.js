import { addChildren, createFormSelect, setAttributes, setAttributeNodes } from "../utils/dom-util.js";
import { getPriorityRange } from "../utils/priority.js";
import TodoView from "./todo-view.js";
import { ProjectsControl } from "../controllers/projects-control.js";

export default class ProjectView{
    #formDialog = document.createElement("dialog");
    #projectDiv = document.createElement("div");
    #taskNameInput = document.createElement("input");
    #descInput = document.createElement("textarea");
    #inputDate = document.createElement("input");
    #prioritySelect;

    constructor(project){
        this.project = project;
        this.#prioritySelect = createFormSelect(`select${this.project.id}`, getPriorityRange());
        this.#renderAddTodoForm();
        this.#projectDiv.appendChild(this.#formDialog);
        console.log(this.#projectDiv.innerHTML)
        // Appends the element to the Dom
        // Must be before todo form render
    }

    render(){
        const mainContainer = document.querySelector(".main-container");
        mainContainer.innerHTML = ""; //clear main page;
        mainContainer.appendChild(this.#projectDiv);

        this.#projectDiv.innerHTML = `<h1>${this.project.name}</h1>`
        this.#projectDiv.id = `projectId${this.project.id}`;

        const addTaskBtn = document.createElement("button");
        const itemsContainer = document.createElement("div");
        itemsContainer.classList.toggle("item-list-div");
        addTaskBtn.textContent = "Add Task";
        addTaskBtn.classList.toggle("add-task-btn");
        addTaskBtn.addEventListener("click", ()=>{
            this.#formDialog.showModal();
        });

        console.log(this.project
            .getTodoList())
        // Render all Todo items inside project
        const itemDivList = this.project
            .getTodoList()
            .map((element) => new TodoView(element).render());
        addChildren(itemsContainer, itemDivList);
        addChildren(this.#projectDiv, [itemsContainer, addTaskBtn]);
    }


    #renderAddTodoForm(){
        this.#formDialog.innerHTML = "";
        const formDiv = document.createElement("form");

        // Render text, actions and confirm sections
        const textField = this.#renderTextField();
        const actions = this.#renderActions();
        const confirmField = this.#renderConfirmField();

        // Send correct data when submitted
        formDiv.addEventListener("submit", (e) => {
            e.preventDefault();
            this.#formDialog.returnValue = JSON.stringify({
                title: this.#taskNameInput.value,
                dueDate: this.#inputDate.value,
                priority: this.#prioritySelect.lastChild.value,
                description: this.#descInput.value
            });
            this.#formDialog.close()
        });

        // When form is submitted or closed
        this.#formDialog.addEventListener("close", ()=>{
            if(this.#formDialog.returnValue !== "cancel"){
                let response = JSON.parse(this.#formDialog.returnValue);
                response.priority = parseInt(response.priority);
                ProjectsControl.addTodoHandler(this.project.id,response);
            }
            formDiv.reset();
 
        });

        addChildren(formDiv, [textField, actions, confirmField]);
        this.#formDialog.appendChild(formDiv);
    }


    // Helper methods
    #renderTextField(){
        const textField = document.createElement("section");
        this.#taskNameInput.placeholder = "Task name";
        this.#taskNameInput.required = true;
        this.#descInput.placeholder = "Description";
        textField.classList.toggle("text-section");
        setAttributeNodes([this.#taskNameInput, textField], "autocomplete", "off");
        setAttributes(this.#taskNameInput, ["name", "id"],`name${this.project.id}`);
        setAttributes(this.#descInput, ["name", "id"], `description${this.project.id}`);
        addChildren(textField, [this.#taskNameInput, this.#descInput]);
        
        return textField;
    }

    #renderActions(){
        const actions = document.createElement("section");
        this.#inputDate.setAttribute("type", "date");
        this.#inputDate.required = true;
        actions.classList.toggle("action-section");
        addChildren(actions, [this.#inputDate, this.#prioritySelect]);

        return actions;
    }

    #renderConfirmField(){
        const confirmField = document.createElement("section");
        const confirmAddBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        confirmAddBtn.textContent = "Confirm";
        cancelBtn.value = "cancel";
        addChildren(confirmField, [cancelBtn, confirmAddBtn]);
        confirmField.classList.toggle("confirm-section");

        // Cancel button triggers a close event
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.#formDialog.close("cancel");
        });

        return confirmField;
    }
}



