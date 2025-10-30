import { useMemo, useState, useEffect } from 'react';
import BinaryTree from './BinaryTree';
import { arbolInicial } from './data';
import type { Nodo } from './types';
import './App.css';

function clonar<T>(x: T): T { return JSON.parse(JSON.stringify(x)); }

function insertar(root: Nodo | null, valor: number): Nodo {
  if (!root) return { valor, izquierda: null, derecha: null };
  let cur = root;
  for (;;) {
    if (valor === cur.valor) break;
    if (valor < cur.valor) {
      if (!cur.izquierda) { cur.izquierda = { valor, izquierda: null, derecha: null }; break; }
      cur = cur.izquierda;
    } else {
      if (!cur.derecha) { cur.derecha = { valor, izquierda: null, derecha: null }; break; }
      cur = cur.derecha;
    }
  }
  return root;
}

function preorden(n: Nodo | null, out: number[] = []): number[] {
  if (!n) return out;
  out.push(n.valor);
  preorden(n.izquierda, out);
  preorden(n.derecha, out);
  return out;
}
function inorden(n: Nodo | null, out: number[] = []): number[] {
  if (!n) return out;
  inorden(n.izquierda, out);
  out.push(n.valor);
  inorden(n.derecha, out);
  return out;
}
function postorden(n: Nodo | null, out: number[] = []): number[] {
  if (!n) return out;
  postorden(n.izquierda, out);
  postorden(n.derecha, out);
  out.push(n.valor);
  return out;
}
function contiene(root: Nodo | null, valor: number): boolean {
  let cur = root;
  while (cur) {
    if (valor === cur.valor) return true;
    cur = valor < cur.valor ? cur.izquierda : cur.derecha;
  }
  return false;
}

export default function App() {
  const [root, setRoot] = useState<Nodo>(clonar(arbolInicial));
  const [valor, setValor] = useState<string>('');
  const [busca, setBusca] = useState<string>('');

  const recorridos = useMemo(() => ({
    pre: preorden(root),
    in: inorden(root),
    post: postorden(root)
  }), [root]);

  // Imprimir recorridos en la consola del navegador cada vez que cambia el árbol
  useEffect(() => {
  console.clear();
  console.log('Preorder:', recorridos.pre.join(', '));
  console.log('Inorder:', recorridos.in.join(', '));
  console.log('Postorder:', recorridos.post.join(', '));
  }, [recorridos]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Árbol Binario de Búsqueda</h1>

      <div className="controls">
        <input
          placeholder="Número a insertar"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />
        <button onClick={() => {
          const n = Number(valor);
          if (!Number.isFinite(n)) return;
          const copia = clonar(root);
          setRoot(insertar(copia, n));
          setValor('');
        }}>Insertar</button>

        <input
          placeholder="Buscar valor"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <button onClick={() => {
          const n = Number(busca);
          if (!Number.isFinite(n)) return;
          const ok = contiene(root, n);
          alert(ok ? 'Sí está' : 'No está');
        }}>Buscar</button>

        <button onClick={() => setRoot(clonar(arbolInicial))}>Reiniciar</button>
      </div>

      <div className="traversals">
        <div><strong>Preorder:</strong> {recorridos.pre.join(', ')}</div>
        <div><strong>Inorder:</strong> {recorridos.in.join(', ')}</div>
        <div><strong>Postorder:</strong> {recorridos.post.join(', ')}</div>
      </div>

      <div className="tree-container">
        <BinaryTree root={root} />
      </div>
    </div>
  );
}