//Todo Item Class

import { MINPRIORITY } from "../utils/priority.js";
import {validateDate, validatePriority, validateTitle} from "../utils/validator.js";

export default class TodoItem {
    #title = "";
    #completed = false;
    #dueDate;
    #priority = MINPRIORITY;
    #myid;
    static #id = 0;
    
    constructor({title, dueDate, priority, description = ""}){
        this.title = title;
        this.dueDate = dueDate;
        if (priority) this.priority = priority;
        this.description = description;

        TodoItem.#id++;
        this.#myid = TodoItem.#id;
    }

    markComplete(){
        this.#completed = true;
    }

    markIncomplete(){
        this.#completed = false;
    }

    /**
     * 
     * @returns {Boolean}
     * @description returns completed status of a todo item.
     */
    isComplete(){
        return this.#completed;
    }

    static setLatestId(newId){
        TodoItem.#id = newId
    }

    set id(newId){
        this.#myid = newId;
    }

    get id(){
        return this.#myid;
    }

    set dueDate(newDate){
        if(validateDate(newDate)) this.#dueDate = newDate;
    } 

    get dueDate(){
        return this.#dueDate;
    }

    set title(newTitle){
        if(validateTitle(newTitle)) this.#title = newTitle;
    }

    get title(){
        return this.#title;
    }

    set priority(newPriority){
        if(validatePriority(newPriority)) this.#priority = newPriority;
    }

    get priority(){
        return this.#priority;
    }

    json(){
        return {
            todoId:this.id, 
            priority:this.priority, 
            title:this.title, 
            description: this.description,
            completed: this.isComplete(), 
            dueDate:this.dueDate
        }
    }
}