import { BTree } from "@tylerbu/sorted-btree-es6";

export default class TodoTree {
    #tree;

    constructor(itemList = [], callback = undefined){
        this.#tree = callback ? new BTree(itemList, callback) : new BTree(itemList);
    }
    
    insert(todoItem){
        this.#tree.set(todoItem.id, todoItem);
    }

    delete(id) {
        this.#tree.delete(id);
    }

    getSortedList(){
        return [...this.#tree.valuesArray()];
    }

    getItem(id){
        return this.#tree.get(id);
    }
    
    getTree(){
        return this.#tree;
    }

    clear(){
        this.#tree.clear();
    }

    json(){
        return this.#tree.toArray().map((pair) => { 
            let id = pair[0];
            return {key: id, item:pair[1].json()}
        });
    }
}
