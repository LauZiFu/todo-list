import ProjectService from "../services/project-service";
import ProjectView from "../views/project-view";
import SidebarView from "../views/sidebar-view";
import { validateFilter, validateWholeNumber } from "../utils/validator.js"
import { FILTERS } from "../styles/css-config.js";
import { prettyPrintJSON } from "../utils/string.js"

import TodoView from "../views/todo-view.js";

export class ProjectsControl{
    static addTodoHandler(projectId, todoJSON){
        if(validateWholeNumber(projectId)){
            ProjectService.addNewTodo(projectId, todoJSON);
            ProjectView.renderTodoList(ProjectService.getProject(projectId));
        }
    }

    static addProject(projectJSON){
        ProjectService.addProject(projectJSON);
        SidebarView.render(ProjectService.getProjects());
    }

    static loadProject(projectId){
        if(validateWholeNumber(projectId)){
            const project = ProjectService.getProject(projectId);
            ProjectView.render(project);
        }
    }

    static removeTodo(projectId, todoId){
        if(validateWholeNumber(projectId) && validateWholeNumber(todoId)){
            ProjectService.removeTodo(projectId, todoId);
            TodoView.remove(todoId);
            console.log( prettyPrintJSON(ProjectService.json()));
        }
    }

    static changeFilter(projectId, filter){
        if(validateFilter(filter) && validateWholeNumber(projectId)){
            const newFilter = FILTERS[filter];
            ProjectService.changeFilter(projectId, newFilter);
            ProjectView.render(ProjectService.getProject(projectId));
        }
    }
}
