
import TodoTree from "./todo-tree";
import { hashPriority, getPriorityRange } from "../../utils/priority";

export default class PriorityTree extends TodoTree{

    constructor(itemList = []){
        super();
        if(itemList) itemList.forEach(({key,item}) => this.insert(item));
    }

    insert(todoItem){
        super.getTree().setIfNotPresent(hashPriority(todoItem.priority, todoItem.id), todoItem);
    }

    getTree(){
        return super.getTree.clone();
    }

    getItem(id){
        let priority;
        for(let i = 0; i < getPriorityRange().length; i++ ){
            priority = getPriorityRange()[i];
            if(super.getTree().get(hashPriority(priority, id)))
                return super.getTree().get(hashPriority(priority, id))
        }
    }

    json(){
        return super.getTree().toArray().map((pair) => { 
            let id = pair[1].id;
            return {key: id, item:pair[1].json()}
        });
    }
}