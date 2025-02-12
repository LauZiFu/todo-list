import { ProjectsControl } from "../controllers/projects-control";

export default class MainView{
    static render(projects){
        const filterBtn = document.querySelector("#filter-btn");

        filterBtn.addEventListener("click", ()=>{
            ProjectsControl.changeFilter(parseInt(filterBtn.dataset.key), "PRIORITY");
        })
    }
}