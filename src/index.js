import {
    addItemToProject, 
    addProject, 
    getProjects, 
    json, 
    removeItemfromProject
} from "./model/projects-manager.js";

import { prettyPrintJSON } from "./utils/string-utils.js";

const newProject = addProject({name: "Lol", description:"asdfasd"});

addItemToProject(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
addItemToProject(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
addItemToProject(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});

removeItemfromProject(newProject.id, 1);

console.log(prettyPrintJSON(json()));
console.log(getProjects());