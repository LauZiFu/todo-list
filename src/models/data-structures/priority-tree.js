import { BTree } from "@tylerbu/sorted-btree-es6";
import TodoTree from "./todo-tree";
import { hashPriority } from "../../utils/priority";

export default class PriorityTree extends TodoTree{
    #tree = new BTree();

    insert(todoItem){
        this.#tree.setIfNotPresent(hashPriority(todoItem.priority, todoItem.id), todoItem);
    }

    json(){
        return this.#tree.toArray().map((pair) => { 
            let id = pair[1].id;
            return {key: id, item:pair[1].json()}
        });
    }
}