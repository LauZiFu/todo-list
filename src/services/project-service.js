
import { validateTodoItem } from "../utils/validator.js";
import Project from "../models/project.js";
import TodoItem from "../models/todo-item.js";
import TodoTree from "../models/data-structures/todo-tree.js";
import ProjectList from "../models/data-structures/project-list.js";

// Manages all projects
export default class ProjectService {
    static projects = new ProjectList();

    /**
     * 
     * @param {*} projectJSON 
     * @returns ID of new project
     * @description Add a new project, either creating a new one or from storage
     */
    static addProject({name, description, projectId = undefined, items = undefined}){
        let newProject;
        if(items) {
            let newTodoList  = items.map(({key, item}) => [key, item]);
            newProject = new Project({name, description, dataStructure: newTodoList});
        } else {
            newProject = new Project({name, description, dataStructure: new TodoTree()});
        } 
        if(projectId){
            newProject.id = projectId;
            Project.setLatestId(projectId);
        }
        ProjectService.projects.insert(newProject);
        return newProject.id;
    }
    
    /**
     * 
     * @param {Number} projectId 
     * @param {JSON} item 
     * @returns new TodoItem object
     */
    static addNewTodo(projectId, todoJson){
        console.log(projectId);
        const newDate = new Date(todoJson.dueDate);
        if(!validateTodoItem(todoJson.title, newDate, todoJson.priority)) return false;

        // set dueDate to parsed Date object
        todoJson.dueDate = newDate;
        const newTodoItem = new TodoItem(todoJson);

        ProjectService.getProject(projectId).addTodo(newTodoItem);
        return newTodoItem.id;
    }

    /**
     * 
     * @param {number} projectId 
     * @param {number} todoId 
     * @description Removes a TodoItem from a project, by its ID.
     */
    static removeTodo(projectId, todoId){
        ProjectService.getProject(projectId).removeTodo(todoId);
    }

    static getTodo(projectId, todoId){
        return ProjectService.projects.getItem(projectId).getTodoItem(todoId);
    }

    static getProject(projectId){
        return ProjectService.projects.getItem(projectId);
    }

    static getProjects(){
        return ProjectService.projects.getSortedList();
    }

    static json(){
        return ProjectService.projects.json();
    }

    static removeProject(id){
        return ProjectService.projects.delete(id);
    }
}