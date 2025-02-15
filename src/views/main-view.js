import { ProjectsControl } from "../controllers/projects-control";
import { setAttributeNodes, setAttributes, addChildren } from "../utils/dom-util";

export default class MainView{
    static render(projects){
        const sidebar = document.querySelector(".sidebar");
        const addProjBtn = document.querySelector("#addProjBtn");

        this.#renderFilterBtn();
        const projectForm = this.#renderProjectForm();
        sidebar.appendChild(projectForm);

        addProjBtn.addEventListener("click", ()=>{
            projectForm.showModal();
        })
    }

    static #renderFilterBtn(){
        const filterBtn = document.querySelector("#filter-btn");

        const filterPriorityBtn = document.querySelector("#filter-priority-btn");
        filterPriorityBtn.addEventListener("click", ()=>{
            ProjectsControl.changeFilter(parseInt(filterBtn.dataset.key), "PRIORITY");
            filterBtn.textContent = `Sort by: Priority`;
        })

        const filterIdBtn = document.querySelector("#filter-oldest-btn");
        filterIdBtn.addEventListener("click", () =>{
            ProjectsControl.changeFilter(parseInt(filterBtn.dataset.key), "OLDEST");
            filterBtn.textContent = `Sort by: Old`;
        })

        const filterOldestBtn = document.querySelector("#filter-newest-btn");
        filterOldestBtn.addEventListener("click", ()=>{
            ProjectsControl.changeFilter(parseInt(filterBtn.dataset.key), "NEWEST" );
            filterBtn.textContent = `Sort by: New`;
        })
    }

    static #renderProjectForm(){
        const formDialog = document.createElement("dialog");
        const formDiv = document.createElement("form");
        const textField = document.createElement("section");
        const confirmField = document.createElement("section");
        const taskNameInput = document.createElement("input");
        const descInput = document.createElement("textarea");
        const confirmAddBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");
        formDiv.id = "add-project-form";
    
        const renderTextField = (() =>{

            taskNameInput.placeholder = "Project name";
            taskNameInput.required = true;
            descInput.placeholder = "Description";
    
            textField.classList.toggle("text-section");
            setAttributeNodes([taskNameInput, textField], "autocomplete", "off");
            setAttributes(taskNameInput, ["name", "id"],`project-form-name`);
            setAttributes(descInput, ["name", "id"], `project-form-desc`);
            addChildren(textField, [taskNameInput, descInput]);
        })();
    
    
        const renderConfirmField = (() => {

            cancelBtn.textContent = "Cancel";
            confirmAddBtn.textContent = "Confirm";
            cancelBtn.value = "cancel";
            addChildren(confirmField, [cancelBtn, confirmAddBtn]);
    
            confirmField.classList.toggle("confirm-section");
            confirmAddBtn.classList.toggle("confirm-btn");
    
            // Cancel button triggers a close event
            cancelBtn.addEventListener("click", (e) => {
                e.preventDefault();
                formDiv.reset();
                formDialog.close();
            });
        })();
    
        const eventListeners = (() => {
            // Send correct data when submitted
            formDiv.addEventListener("submit", (e) => {
                e.preventDefault();
                const response = {
                    name: taskNameInput.value,
                    description: descInput.value
                };
                ProjectsControl.addProject(response);
                formDiv.reset();
                formDialog.close();
            });
        })();
    
        addChildren(formDiv, [textField, confirmField]);
        formDialog.appendChild(formDiv);
        return formDialog;
    }
}