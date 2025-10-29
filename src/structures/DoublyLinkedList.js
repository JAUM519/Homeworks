// Lista doble para “navegar atrás/adelante” como historial
class DNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.current = null;
  }

  // visitar una nueva URL
  visit(value) {
    const node = new DNode(value);
    if (!this.head) {
      this.head = this.tail = node;
      this.length = 1;
      this.current = node; // página actual
      return;
    }
    if (this.current && this.current.next) {
      let t = this.current.next;
      while (t) { const nx = t.next; t.prev = t.next = null; t = nx; this.length--; }
      this.current.next = null;
      this.tail = this.current;
    }
    this.current.next = node;
    node.prev = this.current;
    this.tail = node;
    this.current = node;
    this.length++;
  }

  back() {
    if (this.current?.prev) this.current = this.current.prev;
    return this.current?.value ?? null;
  }

  forward() {
    if (this.current?.next) this.current = this.current.next;
    return this.current?.value ?? null;
  }

  peekCurrent() { return this.current?.value ?? null; }

  printFromHead() {
    const out = [];
    let n = this.head;
    while (n) { out.push(n.value); n = n.next; }
    return out;
  }
}
