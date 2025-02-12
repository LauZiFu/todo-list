import { addChildren, createButton } from "../utils/dom-util";
import ProjectView from "./project-view";

export default class SidebarView{
    #projectNav = document.querySelector("#project-nav");
    #addProjBtn = document.querySelector("#addProjBtn");

    constructor(projectsList){
        this.projectsList = projectsList.map(({key,item}) => item);
    }

    render(){
        this.#projectNav.innerHTML = "";
        const sideButtons = this.projectsList.map((element) => {
            return createButton({
                textContent: element.name, 
                callback: () => ProjectView.render(element)
            });
        });

        addChildren(this.#projectNav, sideButtons);
        sideButtons[sideButtons.length-1].dispatchEvent(new Event("click"));
    }
}

