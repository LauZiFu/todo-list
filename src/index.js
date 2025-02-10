import ProjectManager from "./model/project-manager.js";
import { prettyPrintJSON } from "./utils/string-utils.js";

const newProject = ProjectManager.addProject({name: "Lol", description:"asdfasd"});

ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});

ProjectManager.removeTodo(newProject.id, 1);

console.log(prettyPrintJSON(ProjectManager.json()));
console.log(ProjectManager.getProjects());