import { addChildren, createButton } from "../utils/dom-util";
import ProjectView from "./project-view";

export default class SidebarView{
    #projectNav = document.querySelector("#project-nav");;
    #addProjBtn = document.querySelector("#addProjBtn");;

    constructor(projectsList){
        this.projectsList = projectsList.map(({key,item}) => item);
    }

    render(){
        let projectView;
        this.#projectNav.innerHTML = "";

        const sideButtons = this.projectsList.map((element) => {
            projectView = new ProjectView(element);
            return createButton({
                textContent: element.name, 
                callback: projectView.render.bind(projectView)
            });
        });

        addChildren(this.#projectNav, sideButtons);
        sideButtons[sideButtons.length-1].dispatchEvent(new Event("click"));
    }
}

