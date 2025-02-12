import { ProjectsControl } from "./controllers/projects-control.js";
import ProjectService from "./services/project-service.js";
import MainView from "./views/main-view.js";
import { prettyPrintJSON } from "./utils/string.js";

ProjectsControl.addProject({name: "Lol", description:"asdfasd"});
ProjectsControl.addProject({name: "hahah", description:"asdasd"});

MainView.render();
console.log( prettyPrintJSON(ProjectService.json()));