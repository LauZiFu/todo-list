import { ProjectsControl } from "../controllers/projects-control";

export default class MainView{
    static render(projects){
        const filterBtn = document.querySelector("#filter-btn");
        const dropDown = filterBtn.nextElementSibling;
        dropDown.classList.toggle("hide");

        filterBtn.addEventListener("click", ()=>{
            dropDown.classList.toggle("hide");
            dropDown.classList.toggle("show");
            ProjectsControl.changeFilter(parseInt(filterBtn.dataset.key), "PRIORITY");
        })
    }
}