import { ProjectsControl } from "./controllers/projects-control.js";
import ProjectService from "./services/project-service.js";
import MainView from "./views/main-view.js";
import { prettyPrintJSON } from "./utils/string.js";
import "./styles/styles.css";


MainView.render();
console.log( prettyPrintJSON(ProjectService.json()));