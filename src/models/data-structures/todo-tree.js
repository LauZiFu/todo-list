import { BTree } from "@tylerbu/sorted-btree-es6";

export default class TodoTree {
    #tree = new BTree();

    insert(todoItem){
        this.#tree.setIfNotPresent(todoItem.id, todoItem);
    }

    delete(id) {
        this.#tree.delete(id);
    }

    getSortedList(){
        return this.#tree.valuesArray();
    }

    getItem(id){
        return this.#tree.get(id);
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
