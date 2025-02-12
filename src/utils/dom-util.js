import TodoTree from "../models/data-structures/todo-tree";
import PriorityTree from "../models/data-structures/priority-tree";

export const FILTERS = (function(){
    const filters = {
        ID: TodoTree,
        DATE: "DATE",
        PRIORITY: PriorityTree
    }
    return {...filters}
})()


export function getDOMprojectID(id){
    return `project${id}`;
}

export function getDOMtodoID(id){
    return `todo${id}`;
}

export function getRGBColor(value, min, max){
    let normalized = (value - min)/(max - min);
    normalized = Math.max(0, Math.min(1, normalized));

    let r = Math.round(255 * (1-normalized));
    let g = Math.round (255 * normalized);

    return `rgb(${r}, ${g}, 0)`;
}

export function addChildren(elem, childList){
    childList.forEach((child) => elem.appendChild(child));
}

/**
 * 
 * @param {Node} elem 
 * @param {Array.<string>} attributes 
 * @param {string} value 
 */
export function setAttributes(elem, attributes, value){
    attributes.forEach((attribute) => elem.setAttribute(attribute, value));
}

/**
 * 
 * @param {Array.<Node>} nodeList 
 * @param {string} attribute 
 * @param {*} value 
 */
export function setAttributeNodes(nodeList, attribute, value){
    nodeList.forEach((node => node.setAttribute(attribute, value)));
}

/**
 * 
 * @param {*} id 
 * @param {Array.<string>} options 
 */
export function createFormSelect(id, options = []){
    const selectContainer = document.createElement("div");
    const label = document.createElement("label");
    const selectElem = document.createElement("select");
    let newOption;

    label.setAttribute("for", id);
    setAttributes(selectElem, ["name", "id"], id);
    
    // Creates option element for each value string
    options.forEach((value) => {
        newOption = document.createElement("option");
        newOption.value = value;
        newOption.textContent = value;
        selectElem.appendChild(newOption);
    });
    
    addChildren(selectContainer, [label, selectElem]);
    return selectContainer;
}

export function createButton({textContent = "", callback = undefined, style = "", id = ""}){
    const btn = document.createElement("button");

    if(style) btn.classList.toggle(style);
    if(id) btn.id = id;
    if(textContent) btn.textContent = textContent;
    if (callback) btn.addEventListener("click", (event) => callback(event));
    return btn;
}

