
import ProjectService from "./services/project-service.js";
import ProjectView from "./views/project-view.js";
import TodoView from "./views/todo-view.js";
import { addTodoControl } from "./controllers/todo-control.js";
import PriorityTree from "./models/data-structures/priority-tree.js";

const mainDiv = document.querySelector(".main-container");
const projOneID = ProjectService.addProject({name: "Lol", description:"asdfasd"});
const proj1 = ProjectService.getProject(projOneID);


ProjectService.addNewTodo(projOneID, {title:"lol", dueDate:"2002-10-22", priority:5});
const projOneRender = new ProjectView(proj1, TodoView, addTodoControl);

projOneRender.render();
proj1.changeFilter(new PriorityTree());