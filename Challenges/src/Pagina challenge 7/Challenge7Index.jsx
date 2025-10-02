import React from 'react'
import { Link } from 'react-router-dom'

export default function Challenge7Index() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Challenge 7</h2>
      <p>Selecciona una pagina:</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/challenge7/canciones"><button>Reproductor (Linked List)</button></Link>
        <Link to="/challenge7/historial"><button>Historial (Doubly Linked List)</button></Link>
      </div>
    </div>
  )
}
