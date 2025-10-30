// Cola para cajero
export class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    this.items[this.tail] = value;
    this.tail += 1;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.items[this.head];
    this.items[this.head] = undefined;
    this.head += 1;

    // compactar ocasionalmente
    if (this.head > 50 && this.head * 2 > this.tail) {
      this.items = this.items.slice(this.head, this.tail);
      this.tail = this.tail - this.head;
      this.head = 0;
    }
    return value;
  }

  peek() {
    return this.isEmpty() ? null : this.items[this.head];
  }

  size() {
    return this.tail - this.head;
  }

  isEmpty() {
    return this.size() === 0;
  }

  print() {
    const out = [];
    for (let i = this.head; i < this.tail; i++) {
      if (this.items[i] !== undefined) out.push(this.items[i]);
    }
    return out;
  }

  clear() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }
}
