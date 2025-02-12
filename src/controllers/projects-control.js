import ProjectService from "../services/project-service";
import ProjectView from "../views/project-view";
import SidebarView from "../views/sidebar-view";

export class ProjectsControl{
    static addTodoHandler(projectId, todoJSON){
        ProjectService.addNewTodo(projectId, todoJSON);
        ProjectsControl.loadProject(projectId);
    }

    static addProjectControl(projectJSON){
        ProjectService.addProject(projectJSON);
        const sideBarView = new SidebarView(ProjectService.getProjects());
        sideBarView.render();
    }

    static loadProject(projectId){
        const project = ProjectService.getProject(projectId);
        const projView = new ProjectView(project);
        projView.render();
    }
}
