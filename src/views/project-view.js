import { addChildren, createFormSelect, setAttributes, setAttributeNodes, getDOMprojectID } from "../utils/dom-util.js";
import { getPriorityRange } from "../utils/priority.js";
import { ProjectsControl } from "../controllers/projects-control.js";
import TodoView from "./todo-view.js";

export default class ProjectView{

    static render(project){
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `<h1>${project.name}</h1>`
        projectDiv.id = getDOMprojectID(project.id);
        projectDiv.dataset.key = project.id;
        projectDiv.classList.toggle("project");

        const mainContainer = document.querySelector(".main-container");
        const addTaskBtn = document.createElement("button");
        const itemsContainer = document.createElement("div");
        const filterBtn = document.querySelector("#filter-btn");

        // Set filterBtn to store project ID every time 
        // page renders
        filterBtn.dataset.key = projectDiv.dataset.key;
        
        // Clear todo list content;
        mainContainer.innerHTML = ""; 
        mainContainer.appendChild(projectDiv);

        itemsContainer.classList.toggle("item-list-div");
        addTaskBtn.textContent = "Add Task";
        addTaskBtn.classList.toggle("add-task-btn");
        addTaskBtn.addEventListener("click", ()=>{
            formDialog.showModal();
        });

        // Render all Todo items inside project
        const itemDivList = project
            .getTodoList()
            .map((element) => TodoView.render(element));

        const formDialog = this.#renderAddTodoForm(project);
        addChildren(itemsContainer, itemDivList);
        addChildren(projectDiv, [itemsContainer, addTaskBtn, formDialog]);
    }

    /**
     * 
     * @returns 
     */
    static #renderAddTodoForm(project){
        const formDialog = document.createElement("dialog");
        const formDiv = document.createElement("form");
        const textField = document.createElement("section");
        const taskNameInput = document.createElement("input");
        const descInput = document.createElement("textarea");
        const actions = document.createElement("section");
        const inputDate = document.createElement("input");
        const prioritySelect = createFormSelect(`select${project.id}`, getPriorityRange());
        const confirmField = document.createElement("section");
        const confirmAddBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");

        const renderTextField = (() =>{
            taskNameInput.placeholder = "Task name";
            taskNameInput.required = true;
            descInput.placeholder = "Description";

            textField.classList.toggle("text-section");
            setAttributeNodes([taskNameInput, textField], "autocomplete", "off");
            setAttributes(taskNameInput, ["name", "id"],`name${project.id}`);
            setAttributes(descInput, ["name", "id"], `description${project.id}`);
            addChildren(textField, [taskNameInput, descInput]);
        })();


        const renderActions = (() => {
            inputDate.setAttribute("type", "date");
            inputDate.required = true;
            actions.classList.toggle("action-section");
            addChildren(actions, [inputDate, prioritySelect]);
        })();


        const renderConfirmField = (() => {
            cancelBtn.textContent = "Cancel";
            confirmAddBtn.textContent = "Confirm";
            cancelBtn.value = "cancel";
            addChildren(confirmField, [cancelBtn, confirmAddBtn]);
            confirmField.classList.toggle("confirm-section");
    
            // Cancel button triggers a close event
            cancelBtn.addEventListener("click", (e) => {
                e.preventDefault();
                formDialog.close("cancel");
            });
        })();

        
        const eventListeners = (() => {
            // Send correct data when submitted
            formDiv.addEventListener("submit", (e) => {
                e.preventDefault();
                formDialog.returnValue = JSON.stringify({
                    title: taskNameInput.value,
                    dueDate: inputDate.value,
                    priority: prioritySelect.lastChild.value,
                    description: descInput.value
                });
                formDialog.close()
            });
    
            // When form is submitted or closed
            formDialog.addEventListener("close", ()=>{
                if(formDialog.returnValue !== "cancel"){
                    let response = JSON.parse(formDialog.returnValue);
                    response.priority = parseInt(response.priority);
                    ProjectsControl.addTodoHandler(project.id,response);
                }
                formDiv.reset();
            });
        })();
        

        addChildren(formDiv, [textField, actions, confirmField]);
        formDialog.appendChild(formDiv);

        return formDialog;
    }

}



