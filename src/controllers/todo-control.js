import ProjectService from "../services/project-service";
import TodoView from "../views/todo-view";


export function addTodoControl(projectId, todoJson){
        const todoId = ProjectService.addNewTodo(projectId, todoJson);
        const todoItem = ProjectService.getTodo(projectId, todoId);
        const todoViewer = new TodoView(todoItem);
        todoViewer.addToProject(projectId);

}

export function addProjectControl(projectId){

}