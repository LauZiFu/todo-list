

export function getRGBColor(value, min, max){
    let normalized = (value - min)/(max - min);
    normalized = Math.max(0, Math.min(1, normalized));

    let r = Math.round(255 * (1-normalized));
    let g = Math.round (255 * normalized);

    return `rgb(${r}. ${g}, 0)`;
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
        newOption.setAttribute("value", value);
        newOption.textContent = value;
        selectElem.appendChild(newOption);
    });

    addChildren(selectContainer, [label, selectElem]);
    return selectContainer;
}