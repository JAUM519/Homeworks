// Pila de libros
export class Stack {
  constructor() {
    this.items = [];
  }

  push(book) {
    this.items.push(book);
  }

  pop() {
    return this.items.pop() ?? null;
  }

  peek() {
    return this.items.length ? this.items[this.items.length - 1] : null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    // De más reciente a más antiguo
    return [...this.items].reverse();
  }

  clear() {
    this.items = [];
  }
}
