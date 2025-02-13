
export const ProjectRepo = {

    storeProject(id, projectJson){
        if(!localStorage.getItem(`project-${id}`)) 
            localStorage.setItem(`project-${id}`, JSON.stringify(projectJson));
        else 
            logMessage("Project already exists in local storage");
    },

    retrieveProject(id){
        if(!localStorage.getItem(`project-${id}`)) {
            logMessage(`Project ID ${id} does not exist in storage`);
        }
        return localStorage.getItem(`project-${id}`);
    },

    retrieveProjects(){
        const items = [];
        const prefix = "project-";

        for(let i =0; i< localStorage.length; i++){
            const key = localStorage.key(i);
            if(key.startsWith(prefix)) 
                items.push(JSON.parse(localStorage.getItem(key)));
        }
        return items;
    }

    deleteProject(id){
        if (!localStorage.getItem(`project-${id}`)) 
            logMessage("Project already exists in local storage");
        else
            localStorage.removeItem(`project-${id}`);
    },

    changeProject(id, projectJson){
        localStorage.setItem(`project-${id}`, JSON.stringify(projectJson));
    },

    storeProjects(projectsArray){
        projectsArray.forEach(({key, item}) => this.storeProject(key, item));
    }
}
