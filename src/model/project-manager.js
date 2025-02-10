
import { validateTodoItem } from "../utils/validator.js";
import Project from "./project.js";
import TodoItem from "./todo-item.js";
import TodoList from "./data-structures/todo-list.js";

// Manages all projects
export default class ProjectManager {
    static projects = new TodoList();

    static addProject({name, description, projectId = 0, items = []}){
        
        let newProject;
        if(!Array.isArray(items)) {
            newProject = new Project({name, description, dataStructure: items});
        } else {
            newProject = new Project({name, description, dataStructure: new TodoList()});
        }
        ProjectManager.projects.insert(newProject);
        // On page reload
        return newProject;
    }

    /**
     * 
     * @param {Number} projectId 
     * @param {JSON} item 
     * @returns new TodoItem object
     */
    static addNewTodo(projectId, todoJson){
        const newDate = new Date(todoJson.dueDate);
        if(!validateTodoItem(todoJson.title, newDate, todoJson.priority)) return false;

        // set dueDate to parsed Date object
        todoJson.dueDate = newDate;
        const newTodoItem = new TodoItem(todoJson);

        ProjectManager.getProject(projectId).addTodo(newTodoItem);
        return newTodoItem;
    }

    /**
     * 
     * @param {number} projectId 
     * @param {number} todoId 
     * @description Removes a TodoItem from a project, by its ID.
     */
    static removeTodo(projectId, todoId){
        ProjectManager.getProject(projectId).removeTodo(todoId);
    }

    /**
     * 
     * @param {Project} newProject 
     * @param {Number} projectId 
     * @param {Array} items 
     * @description Checks if is page reloaded and add Todo items to Project
     */
    static addItemsFromList(newProject, projectId = 0, items  = []){
        if(projectId !== 0){ 
            newProject.id = projectId;
            Project.setLatestId(projectId);
        }

        if(items.length > 0) {
            let newTodo;
            // Add fetched item list to the new project
            items.forEach(({creationId, item}, index) => {
                newTodo = ProjectManager.addNewTodo(creationId, item);
                // Add completd and 
                newTodo.completed = item.completed;
                newTodo = item.id;
                if(index === items.length-1) TodoItem.setLatestId(creationId);
            });
        }
    }


    static getProject(projectId){
        return ProjectManager.projects.getItem(projectId);
    }

    static getProjects(){
        return ProjectManager.projects.getSortedList();
    }

    static json(){
        return ProjectManager.projects.json();
    }

    static removeProject(id){
        return ProjectManager.projects.delete(id);
    }
}