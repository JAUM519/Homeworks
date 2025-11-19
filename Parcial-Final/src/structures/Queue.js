export class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(value) {
        this.items.push(value);
    }

    dequeue() {
        if (this.items.length === 0) return null;
        return this.items.shift();
    }

    peek() {
        if (this.items.length === 0) return null;
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        console.log('Queue:', this.items);
    }
}
