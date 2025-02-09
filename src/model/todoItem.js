//Todo Item Class

import * as validator from "../utils/validator";

export default class TodoItem {
    #title = "";
    #completed = false;
    #dueDate;
    #priority = 1;

    
    constructor({title, description = "", dueDate, priority}){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    markComplete(){
        this.#completed = true;
    }

    isComplete(){
        return this.#completed;
    }

    set dueDate(newDate){
        if(validator.validateDate(newDate)) this.#dueDate = newDate;
    } 

    get dueDate(){
        return this.#dueDate;
    }

    set title(newTitle){
        if(validator.validateTitle(newTitle)) this.#title = newTitle;
    }

    get title(){
        return this.#title;
    }

    set priority(newPriority){
        if(validator.validatePriority(newPriority)) this.#priority = newPriority;
    }

    get priority(){
        return this.#priority;
    }
}