
import { validateTodoItem } from "../utils/validator.js";
import Project from "../models/project.js";
import TodoItem from "../models/todo-item.js";
import TodoTree from "../models/data-structures/todo-tree.js";
import ProjectList from "../models/data-structures/project-list.js";
import { prettyPrintJSON } from "../utils/string.js";

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
            newProject = new Project({
                name, 
                description, 
                dataStructure: new TodoTree(newTodoList)
            });
        } else {
            newProject = new Project({name, description, dataStructure: new TodoTree()});
        } 
        
        if(projectId){
            newProject.id = projectId;
            Project.setLatestId(projectId);
        }
        this.projects.insert(newProject);
        return newProject.id;
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

        ProjectService.projects.getItem(projectId).addTodo(newTodoItem);
        return newTodoItem.id;
    }

    /**
     * 
     * @param {number} projectId 
     * @param {number} todoId 
     * @description Removes a TodoItem from a project, by its ID.
     */
    static removeTodo(projectId, todoId){
        this.projects.getItem(projectId).removeTodo(todoId);
    }

    static changeFilter(projectId, dataStructure){
        this.projects.getItem(projectId).changeFilter(dataStructure);

    }

    static getTodo(projectId, todoId){
        return this.projects.getItem(projectId).getTodoItem(todoId);
    }


    static getProject(projectId){
        return this.projects.getItem(projectId);
    }


    static getProjects(){
        return this.projects.getSortedList();
    }


    static json(){
        return this.projects.json();
    }

    
    static removeProject(id){
        return this.projects.delete(id);
    }
}