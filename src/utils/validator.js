
import logMessage from "./logger";

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
    if (typeof id !== "number" || id <= 0) {
        logMessage("Invalid Priority Int: Must be a positive number.");
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