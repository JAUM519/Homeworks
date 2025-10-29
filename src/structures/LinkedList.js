// Lista enlazada simple para “reproducir canciones en orden”
export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.current = null; // puntero de reproducción
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    if (!this.current) this.current = this.head;
  }

  size() {
    return this.length;
  }

  peek(index = 0) {
    let i = 0, n = this.head;
    while (n && i < index) {
      n = n.next; i++;
    }
    return n ? n.value : null;
  }

  remove(index = 0) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) {
      const val = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      if (this.current && this.current.value === val) this.current = this.head;
      return val;
    }
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.next;
    const toRemove = prev.next;
    prev.next = toRemove.next;
    if (toRemove === this.tail) this.tail = prev;
    this.length--;
    if (this.current === toRemove) this.current = prev.next || this.head;
    return toRemove.value;
  }

  print() {
    const out = [];
    let n = this.head;
    while (n) { out.push(n.value); n = n.next; }
    return out;
  }

  // reproducción
  reset() { this.current = this.head; return this.current?.value ?? null; }
  nextTrack() {
    if (!this.current) return null;
    const val = this.current.value;
    this.current = this.current.next || null;
    return val;
  }
  currentTrack() { return this.current?.value ?? null; }
}
