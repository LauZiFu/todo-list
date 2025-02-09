import logMessage from "../logger";

export default class FibonnaciNode {
    #mark = false;
    #degree = 0
    left = this;
    right = this;
    
    constructor(key, payload){
        this.key = key;
        this.payload = payload;
        this.parent;
        this.child;
    }
    
    setMarked(){
        this.#mark = true;
    }

    unMark(){
        this.#mark = false;
    }

    getMark(){
        return this.#mark;
    }

    incrementDegree(){
        this.#degree++;
    }

    getDegree(){
        return this.#degree;
    }     

    toString(){
        return `${this.key}`;
    }
}
