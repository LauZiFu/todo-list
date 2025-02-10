import { BTree } from "@tylerbu/sorted-btree-es6";

export default class TodoTree {
    #tree = new BTree(undefined, (a,b) => {
        if (a.priority > b.priority)
            return 1;
        else if (a.priority < b.priority)
            return -1;
        else 
            return a.id - b.id;
    });

    insert(todoItem){
        this.#tree.setIfNotPresent({priority:todoItem.priority, id:todoItem.id}, todoItem);
    }

    delete({priority, id}) {
        this.#tree.delete({priority, id});
    }

    getSortedList(){
        return this.#tree.valuesArray();
    }

    getItem({priority, id}){
        return this.#tree.get({priority, id});
    }

    clear(){
        this.#tree.clear();
    }

    json(){
        return this.#tree.toArray().map((pair) => { 
            let id = pair[0].id;
            return {key: id, item:pair[1].json()}
        });
    }
}
