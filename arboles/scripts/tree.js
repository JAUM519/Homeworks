class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
  isLeaf() {
    return this.izquierda === null && this.derecha === null;
  }
}

class ArbolBinario {
  constructor() { this.raiz = null; }

  insertar(valor) {
    const nuevo = new Nodo(valor);
    if (!this.raiz) { this.raiz = nuevo; return; }
    let cur = this.raiz;
    for (;;) {
      if (valor === cur.valor) return; // sin duplicados
      if (valor < cur.valor) {
        if (!cur.izquierda) { cur.izquierda = nuevo; return; }
        cur = cur.izquierda;
      } else {
        if (!cur.derecha) { cur.derecha = nuevo; return; }
        cur = cur.derecha;
      }
    }
  }

  preorden(n = this.raiz) {
    if (!n) return;
    console.log(n.valor);
    this.preorden(n.izquierda);
    this.preorden(n.derecha);
  }
  inorden(n = this.raiz) {
    if (!n) return;
    this.inorden(n.izquierda);
    console.log(n.valor);
    this.inorden(n.derecha);
  }
  postorden(n = this.raiz) {
    if (!n) return;
    this.postorden(n.izquierda);
    this.postorden(n.derecha);
    console.log(n.valor);
  }

  contiene(valor) {
    let cur = this.raiz;
    while (cur) {
      if (valor === cur.valor) return true;
      cur = valor < cur.valor ? cur.izquierda : cur.derecha;
    }
    return false;
  }
}

if (require.main === module) {
  const arbol = new ArbolBinario();
  [10, 5, 15, 2, 7, 12, 20].forEach(v => arbol.insertar(v));

  console.log('PreOrder:');
  arbol.preorden();
  console.log('InOrder:');
  arbol.inorden();
  console.log('PostOrder:');
  arbol.postorden();

  console.log('Contiene 7?', arbol.contiene(7));
  console.log('Contiene 100?', arbol.contiene(100));
}