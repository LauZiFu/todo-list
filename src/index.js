import TodoItem from "./model/todo-item.js";
import FibonnaciNode from "./utils/fibbonacci-heap/fib-node.js";
import FibonnaciHeap from "./utils/fibbonacci-heap/fibonacci-heap.js";


const heap1 = new FibonnaciHeap(1, "lol");

heap1.insert(2, "hahaha");
heap1.insert(3, "lmao");
heap1.insert(4, "amsdasd");
heap1.insert(5, "amsdasd");

console.log(heap1.toString())
console.log(heap1.extractMin().toString());
console.log(heap1.minNode.toString());
console.log(heap1.toString())

console.log(heap1.extractMin().toString());
console.log(heap1.minNode.toString());
console.log(heap1.toString());

console.log(heap1.extractMin().toString());
console.log(heap1.minNode.toString());
console.log(heap1.toString());

console.log(heap1.extractMin().toString());
console.log(heap1.minNode.toString());
console.log(heap1.toString());

console.log(heap1.extractMin().toString());
console.log(heap1.minNode.toString());
console.log(heap1.toString());

heap1.insert(2, "hahaha");
console.log(heap1.toString());