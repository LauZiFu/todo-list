import ProjectManager from "./model/project-manager.js";
import { prettyPrintJSON } from "./utils/string-utils.js";
import TodoTree from "./model/data-structures/todo-tree.js";

const newProject = ProjectManager.addProject({name: "Lol", description:"asdfasd"});


ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});
ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:3, description:"haha"});

console.log(prettyPrintJSON(ProjectManager.getProject(newProject.id).json()));
ProjectManager.addNewTodo(newProject.id, {title:"haha", dueDate:"2002-12-22", priority:1, description:"haha"});

console.log(prettyPrintJSON(ProjectManager.getProject(newProject.id).json()));
newProject.changeFilter(new TodoTree());

console.log(ProjectManager.getProject(newProject.id).getTodoList());
ProjectManager.addProject({name: "Lol", description:"asdfasd"});

console.log(prettyPrintJSON(ProjectManager.json()));