import TodoTree from "../models/data-structures/todo-tree";
import PriorityTree from "../models/data-structures/priority-tree";

export const FILTERS = (function(){
    const filters = {
        get ID(){
            return new TodoTree;
        },
        get PRIORITY() {
            return new PriorityTree;
        }
    }

    return {...filters}
})()


export const classList = {
    todoItem: "todo-item",
    project: "project",
    todoList: "item-list-div",
    formActions: "actions",
    addTaskBtn: "add-task-btn",
    textSection: "text-section",
    actionSection: "action-section",
    confirmSection: "confirm-section",
    confirmAddBtn: "confirm-btn",
}

export function getDOMprojectID(id){
    return `project${id}`;
}


export function getDOMtodoID(id){
    return `todo${id}`;
}
