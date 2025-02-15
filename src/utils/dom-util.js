
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

export function createDropDown(textContent, menuContent = []){
    const dropDown = document.createElement("div");
    dropDown.classList.toggle("drop-down");

    const dropDownBtn = createButton({textContent});
    dropDownBtn.textContent = textContent;
    dropDownBtn.dataset.focused = "false"; // Store focus state in dataset

    dropDownBtn.addEventListener("click", function() {
        if (dropDownBtn.dataset.focused === "false") {
            dropDownBtn.focus();
            dropDownBtn.dataset.focused = "true";
        } else {
            setTimeout(() => {
                dropDownBtn.blur();
                dropDownBtn.dataset.focused = "false";
            }, 0);
        }
    });


    const contentDiv = document.createElement("div");
    const dropDownMenu = document.createElement("div");
    addChildren(dropDownMenu,menuContent);

    addChildren(dropDown, [dropDownBtn, contentDiv])
    contentDiv.appendChild(dropDownMenu);
    dropDownMenu.classList.toggle("dropdown-content");

    // Reset state when focus is lost (e.g., clicking outside)
    dropDownBtn.addEventListener("focus", ()=>{
        adjustDropdownPosition(contentDiv);
    });

    // Reset state when focus is lost (e.g., clicking outside)
    dropDownBtn.addEventListener("blur", function() {
        adjustDropdownPosition(contentDiv);
        dropDownBtn.dataset.focused = "false";
    });

    return dropDown;
}

/**
 * Adjust dropdown position to fit within the viewport
 */
export function adjustDropdownPosition(dropdown) {

    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // If dropdown overflows right, shift it to the left
    if (dropdownRect.right > viewportWidth) {
        dropdown.style.right = "0"; // Align to right
        dropdown.style.left = "auto";
    } else {
        dropdown.style.left = "0"; // Default left alignment
        dropdown.style.right = "auto";
    }


}