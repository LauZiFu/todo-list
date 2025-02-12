import logMessage from "../../utils/logger.js";

/**
 * Base class for todo list subclasses
 */
export default class ProjectList {
    arr = [];

    insert(item){
        this.arr.push({key: item.id, item});

    }

    delete(id){
        const myId = this.arr.findIndex(item => item.key == id);
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
            if(this.arr[i].key === id)
                return this.arr[i].item;
        }
    }

    clear(){
        this.arr = [];
    }

    json(){
        return this.arr.map(({key, item:todoItem}) => { 
            return {key, item:todoItem.json()}
        })
    }
}