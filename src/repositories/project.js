
export const ProjectRepo = {
    storeProject(id, projectJson){
        if(!localStorage.getItem(`project-${id}`)) 
            localStorage.setItem(`project-${id}`, JSON.stringify(projectJson));
        else 
            logMessage("Project already exists in local storage");
    },

    deleteProject(id){
        if (!localStorage.getItem(`project-${id}`)) 
            logMessage("Project already exists in local storage");
        else
            localStorage.removeItem(`project-${id}`);
    },

    changeProject(id, projectJson){
        localStorage.setItem(`project-${id}`, JSON.stringify(projectJson));
    },
}
