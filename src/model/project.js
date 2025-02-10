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
        this.#itemList.insert(todoItem.id, todoItem);
    }

    removeTodo(itemId){
        this.#itemList.delete(itemId);
    }

    changeTodo(itemId, newTodoItem){
        this.removeItem(itemId);
        this.addItem(newTodoItem.id, newTodoItem);
    }

    clearProject(){
        this.#itemList.clear();
    }

    changeFilter(dataStructure){
        const arr = this.#itemList.getSortedList()
        arr.forEach((elem) => dataStructure.insert(elem.id, elem))
        this.#itemList = dataStructure;
    }

    json(){
        return {
            name:this.name,
            description: this.description,
        }
    }

    get id() {
        return this.#myId;
    }
}