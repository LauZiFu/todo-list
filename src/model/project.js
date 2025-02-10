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
        const arr = this.#itemList.getSortedList()
        arr.forEach((elem) => dataStructure.insert(elem.id, elem))
        this.#itemList = dataStructure;
    }

    getTodoList(){
        return this.#itemList.getSortedList();
    }

    getTodoItem(id){
        return this.#itemList.getItem(id);
    }

    json(){
        return {
            projectId: this.#myId,
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
}