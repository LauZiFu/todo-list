
import logMessage from "./logger.js";
import { MAXPRIORITY, MINPRIORITY } from "./priority.js";
import { FILTERS } from "../styles/css-config.js";

export function validateDate(newDate){
    if (!(newDate instanceof Date)){
        logMessage("Invalid dueDate: Must be a Date object");
        return false;
    }
    return true;
}    

export function validateTitle(newTitle){
    if (typeof newTitle !== "string" || newTitle.trim() === "") {
        logMessage("Invalid Title: Must be a non-empty string.");
        return false;
    }    
    return true;
}

export function validatePriority(id){
    if (id > MINPRIORITY ||  id < MAXPRIORITY || typeof id !== "number") {
        logMessage(`Invalid Priority: Must be integer between ${MAXPRIORITY} and ${MINPRIORITY}.`);
        return false;
    }    
    return true;
}

export function validateWholeNumber(id){
    if (!Number.isInteger(id) || id <= 0) {
        logMessage("Invalid argument: Must be a whole number (positive integer).");
        return false;
    }    
    return true;
}

export function validateFilter(filter){
    if(!Object.getOwnPropertyNames(FILTERS).some((filterName) => filterName === filter)){
        logMessage("Invalid argument: Must be a whole number (positive integer).");
        return false;
    }
    return true;
}

export function validateTodoItem(newTitle, newDate, priority){
    return validateDate(newDate) && validateTitle(newTitle) && validatePriority(priority);
}