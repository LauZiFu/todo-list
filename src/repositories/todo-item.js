import { ProjectRepo } from "./project";

export const TodoRepo = {
    storeTodo(projectId, projectJson){
        ProjectRepo.changeProject(projectId, projectJson);
    },

    deleteTodo(projectId, projectJson){
        ProjectRepo.changeProject(projectId, projectJson);
    },

    changeTodo(projectId, projectJson){
        ProjectRepo.changeProject(projectId, projectJson);
    },
}