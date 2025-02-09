import logMessage from "../logger";
import FibonnaciNode from "./fib-node";

export default class FibonnaciHeap {
    minNode = "";

    constructor(key, payload){
        this.minNode = new FibonnaciNode(key, payload);
    }

    static #merge(minNodeOne, minNodeTwo){
        minNodeOne.left.right = minNodeTwo.right;
        minNodeTwo.right.left = minNodeOne.left;

        minNodeTwo.right = minNodeOne;
        minNodeOne.left = minNodeTwo;

        // Instantiate a new Fibonacci heap
        const newHeap = new FibonnaciHeap(minNodeOne);
        newHeap.minNode = minNodeOne.key <= minNodeTwo.key ? minNodeOne: minNodeTwo;

        return newHeap;
    } 

    /**
     * 
     * @param {[]} degreeArray 
     * @param {FibonnaciNode} currNode 
     * @returns 
     * @description auxillary function for recursive consolidation of heap
     */
    #reConsolidate(degreeArray, currNode){
        let currDegree = currNode.getDegree();
        let removedNode;
        let newCurrNode;

        if(!degreeArray[currDegree]){
            degreeArray[currDegree] = currNode;
            return currNode;
        } else {
            if(degreeArray[currDegree].key > currNode.key){
                removedNode = FibonnaciHeap.#removeNodeFromHeap(degreeArray[currDegree]);
            } else {
                removedNode = FibonnaciHeap.#removeNodeFromHeap(currNode);
                newCurrNode = degreeArray[currDegree];
            }
            newCurrNode = FibonnaciHeap.#mergeTree(newCurrNode, removedNode);
            degreeArray[currDegree] = 0;
            return this.#reConsolidate(degreeArray, newCurrNode);
        }
    }

    /**
     * 
     * @param {FibonnaciNode} tree1 
     * @param {FibonnaciNode} tree2 
     * @description Auxillary function, combines the root nodes of binomial trees
     */
    static #mergeTree(tree1, tree2){
        tree2.parent = tree1;
        tree1.child = !tree1.child ? tree2 : FibonnaciHeap.#merge(tree1.child, tree2).minNode;
        tree1.incrementDegree();
        return tree1;
    }

    /**
     * 
     * @param {FibonnaciNode} node 
     * @returns extracted node from heap
     * @description Auxillary function, extracts a node from root list, and reconnects root list
     */
    static #removeNodeFromHeap(node){
        node.left.right = node.right;
        node.right.left = node.left;
        node.left = node;
        node.right = node;
        return node;
    }

    extractMin(){
        let extractedNode = this.minNode;

        if(this.minNode.right !== this.minNode){
            this.minNode = extractedNode.right;
        } else if (extractedNode.child){
            this.minNode = extractedNode.child;
        } else {
            this.minNode = "";
            return extractedNode;
        }

        extractedNode = FibonnaciHeap.#removeNodeFromHeap(extractedNode);
        let currNode = extractedNode.child;
        if(currNode){
            let endNode = currNode.left;
            while(currNode !== endNode){
                currNode.right.parent = null;
                currNode = currNode.right;
            }    
            Object.assign(this, FibonnaciHeap.#merge(this.minNode, currNode)); 
        } 
        // Set extractedNode's siblings to itself
        extractedNode.left = extractedNode;
        extractedNode.right = extractedNode;

        this.consolidate();
        return extractedNode;
    }

    insert(key, payload){
        const newNode = new FibonnaciNode(key, payload);
        if(!this.minNode){
            this.minNode = newNode;
        } else {
            // Merging with the current heap makes the new node the left sibling of the current min
            Object.assign(this, FibonnaciHeap.#merge(this.minNode, newNode));
        }
    }

    consolidate(){
        const degreeArray = [];

        let currNode = this.minNode;
        let endNode = currNode.left

        while(currNode !== endNode){
            if(currNode.key > currNode.right.key) {
                this.minNode = this.currNode.right;
            }
            currNode = this.#reConsolidate(degreeArray, currNode);
            currNode = currNode.right;
        }
        this.#reConsolidate(degreeArray, currNode);
    }


    // Identify min element in the heap
    getMinKey(){
        return this.minNode.key;
    }

    toString() {
        if (!this.minNode) return "Empty Fibonacci Heap";

        let result = "Fibonacci Heap:\n";
        const visited = new Set();

        const traverse = (node, depth = 0) => {
            if (!node || visited.has(node)) return;
            visited.add(node);

            result += "  ".repeat(depth) + `- (${node.key})\n`;

            // Recursively print children
            if (node.child) {
                traverse(node.child, depth + 1);
            }

            // Traverse siblings in the root list
            let sibling = node.right;
            while (sibling && sibling !== node) {
                traverse(sibling, depth);
                sibling = sibling.right;
            }
        };

        traverse(this.minNode);
        return result;
    }
}