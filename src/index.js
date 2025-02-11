import ProjectManager from "./services/project.js";
import { prettyPrintJSON } from "./utils/string.js";

const projOneID = ProjectManager.addProject({name: "Lol", description:"asdfasd"});


ProjectManager.addNewTodo(projOneID, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
ProjectManager.addNewTodo(projOneID, {title:"haha", dueDate:"2002-12-22", priority:5, description:"haha"});
ProjectManager.addNewTodo(projOneID, {title:"haha", dueDate:"2002-12-22", priority:4, description:"haha"});
ProjectManager.addNewTodo(projOneID, {title:"haha", dueDate:"2002-12-22", priority:3, description:"haha"});

console.log(prettyPrintJSON(ProjectManager.getProject(projOneID).json()));
ProjectManager.addNewTodo(projOneID, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});

console.log(prettyPrintJSON(ProjectManager.getProject(projOneID).json()));
