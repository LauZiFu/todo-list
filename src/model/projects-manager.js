
import { validateTodoItem } from "../utils/validator.js";
import Project from "./project.js";
import TodoItem from "./todo-item.js";
import TodoList from "./data-structures/todo-list.js";

const projects = new TodoList();


function addProject({name, description, projectId = 0, items = []}){
    const newProject = new Project({name, description, dataStructure: new TodoList()});
    projects.insert(newProject);
    // On page reload
    
    addItemsFromStorage(newProject, projectId, items);
    return newProject;
}

/**
 * 
 * @param {Number} projectId 
 * @param {*} item 
 * @returns new TodoItem object
 */
function addItemToProject(projectId, todoJson){
    const newDate = new Date(todoJson.dueDate);
    if(!validateTodoItem(todoJson.title, newDate, todoJson.priority)) return false;

    // set dueDate to parsed Date object
    todoJson.dueDate = newDate;
    const newTodoItem = new TodoItem(todoJson);

    getProject(projectId).addTodo(newTodoItem);
    return newTodoItem;
}

/**
 * 
 * @param {number} projectId 
 * @param {number} todoId 
 * @description Removes a TodoItem from a project, by its ID.
 */
function removeItemfromProject(projectId, todoId){
    getProject(projectId).removeTodo(todoId);
}

/**
 * 
 * @param {Project} newProject 
 * @param {Number} projectId 
 * @param {Array} items 
 * @description Checks if is page reloaded and add Todo items to Project
 */
function addItemsFromStorage(newProject, projectId = 0, items  = []){
    if(projectId !== 0){ 
        newProject.id = projectId;
        Project.setLatestId(projectId);
    }

    if(items.length > 0) {
        let newTodo;
        // Add fetched item list to the new project
        items.forEach(({creationId, item}, index) => {
            newTodo = addItemToProject(creationId, item);
            // Add completd and 
            newTodo.completed = item.completed;
            newTodo = item.id;
            if(index === items.length-1) TodoItem.setLatestId(creationId);
        });
    }
}





function getProject(projectId){
    return projects.getItem(projectId);
}

function getProjects(){
    return projects.getSortedList();
}

function json(){
    return projects.json();
}

function removeProject(id){
    return projects.delete(id);
}

export {addProject, removeProject, addItemToProject, getProjects, removeItemfromProject, json}

