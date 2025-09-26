import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

class NodoHistorial {
  constructor(page) {
    this.page = page;
    this.prev = null;
    this.next = null;
  }
}

function buildHistory(pages) {
  if (!pages || pages.length === 0) return null;
  const head = new NodoHistorial(pages[0]);
  let cur = head;
  for (let i = 1; i < pages.length; i++) {
    const node = new NodoHistorial(pages[i]);
    cur.next = node;
    node.prev = cur;
    cur = node;
  }
  return head;
}

const mockPages = [
  { id: 1, url: '/inicio', title: 'Inicio' },
  { id: 2, url: '/login', title: 'Login' },
  { id: 3, url: '/perfil', title: 'Perfil' },
  { id: 4, url: '/historial', title: 'Historial' }
];

export default function BrowserHistory() {
  const [head] = useState(() => buildHistory(mockPages));

  const [current, setCurrent] = useState(() => {
    let n = head;
    while (n && n.next) n = n.next;
    return n;
  });

  const goBack = () => {
    if (current && current.prev) setCurrent(current.prev);
  };

  const goForward = () => {
    if (current && current.next) setCurrent(current.next);
  };

  const navigate = useNavigate();

  return (
    <div style={{ padding: 16 }}>
      <h3>Historial - Doubly Linked List</h3>
      {current ? (
        <div>
          <p><strong>{current.page.title}</strong> — <code>{current.page.url}</code></p>
          <div style={{ gap: 8 }}>
            <button onClick={goBack} disabled={!current.prev}>Atrás</button>
            <button onClick={goForward} disabled={!current.next}>Adelante</button>
          </div>
          <p style={{ marginTop: 12, color: '#666' }}>(La lista contiene mocked data)</p>
        </div>
      ) : (
        <p>No hay historial.</p>
      )}
    </div>
  )
}
