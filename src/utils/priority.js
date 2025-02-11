// Utility module for Priority based functions

// Number to pad priority with
const PRIORITYPAD = 1e9;
export const MINPRIORITY = 10;
export const MAXPRIORITY = 1;

/**
 * 
 * @param {number} priority Priority number of item
 * @param {number} itemId Item unique ID
 * @returns 
 */
export function hashPriority(priority, itemId){
    return BigInt(priority) * BigInt(PRIORITYPAD) + BigInt(itemId);
}


export function getPriorityRange(){
    const range = [];
    for(let i = MAXPRIORITY; i <= MINPRIORITY; i++){
        range.push(i);
    }
    return range;
}