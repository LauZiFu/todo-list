import TodoTree from "./todo-tree";

export default class NewestTree extends TodoTree{

    constructor(itemList = []){
        super(itemList, (a,b) => {
            if (a > b){
                return -1;
            } else if (a < b) {
                return 1;
            } else {
                return 0
            }
        });
    }
}