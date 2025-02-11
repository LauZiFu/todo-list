import logMessage from "../../utils/logger.js";

/**
 * Base class for todo list subclasses
 */
export default class ProjectList {
    arr = [];

    insert(item){
        this.arr.push({creationId:item.id, item});
    }

    delete(id){
        const myId = this.arr.findIndex(item => item.creationId == id);
        if(myId || myId === 0){
            this.arr.splice(myId,1);
            return true;
        } 
        logMessage("Item not found, or doesn't exist.");
        return false;
    }

    getSortedList(){
        return [...this.arr];
    }

    getItem(id){
        for (let i =0; i < this.arr.length; i++){
            if(this.arr[i].creationId === id)
                return this.arr[i].item;
        }
    }

    clear(){
        this.arr = [];
    }

    json(){
        return this.arr.map(({creationId, item:todoItem}) => { 
            return {key:creationId, item:todoItem.json()}
        })
    }
}