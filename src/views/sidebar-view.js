import { addChildren, createButton } from "../utils/dom-util";
import ProjectView from "./project-view";

export default class SidebarView{

    static render(projectsList){
        const projectNav = document.querySelector("#project-nav");
        const addProjBtn = document.querySelector("#addProjBtn");
    
        const projects = projectsList.map(({key,item}) => item);
        projectNav.innerHTML = "";

        const sideButtons = projects.map((element) => {
            return createButton({
                textContent: element.name, 
                callback: () => ProjectView.render(element),
                style: "svg-btn"
            });
        });

        addChildren(projectNav, sideButtons);
        sideButtons[sideButtons.length-1].dispatchEvent(new Event("click"));
    }
    
}

