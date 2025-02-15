import TodoTree from "../models/data-structures/todo-tree.js";
import PriorityTree from "../models/data-structures/priority-tree.js";
import NewestTree from "../models/data-structures/newest-tree.js";

export const FILTERS = (function(){
    const filters = {
        OLDEST: TodoTree,
        PRIORITY: PriorityTree,
        NEWEST: NewestTree
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
