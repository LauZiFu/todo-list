import { prettyPrintJSON } from "../utils/string";

export default class Project {
    #itemList;
    #myId;
    static #id = 0;

    constructor({name, description, dataStructure}){
        this.name = name ? name : "";
        this.description = description ? description : "";
        this.#itemList = dataStructure;

        Project.#id++;
        this.#myId = Project.#id;
    }

    addTodo(todoItem){
        this.#itemList.insert(todoItem);
    }

    removeTodo(itemId){
        this.#itemList.delete(itemId);
    }

    clearProject(){
        this.#itemList.clear();
    }

    changeFilter(dataStructure){
        const arr = this.getTodoList();
        this.#itemList = dataStructure;

        arr.forEach((elem) => {
            this.#itemList.insert(elem)});
    }

    getTodoList(){
        return this.#itemList.getSortedList();
    }

    getTodoItem(id){
        return this.#itemList.getItem(id);
    }

    json(){
        return {
            key: this.#myId,
            name: this.name,
            description: this.description,
            items: this.#itemList.json()
        }
    }

    set id(newId){
        this.#myId = newId;
    }

    get id() {
        return this.#myId;
    }

    static setLatestId(newId){
        Project.#id = newId;
    }
}