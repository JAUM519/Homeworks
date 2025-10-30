import { useEffect, useRef, useState } from 'react'
import { Queue } from '../structures/Queue'

export default function AtmQueue() {
  const qRef = useRef(null)

  const [form, setForm] = useState({ name: '', amount: '' })
  const [queueView, setQueueView] = useState([])
  const [front, setFront] = useState(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    const q = new Queue()
    // Mock data inicial
    q.enqueue({ name: 'Ana', amount: 120000 })
    q.enqueue({ name: 'Luis', amount: 80000 })
    q.enqueue({ name: 'Marta', amount: 50000 })
    qRef.current = q
    sync()
  }, [])

  const sync = () => {
    const q = qRef.current
    setQueueView(q.print())
    setFront(q.peek())
    setSize(q.size())
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onEnqueue = (e) => {
    e.preventDefault()
    const name = form.name.trim()
    const amount = Number(form.amount)
    if (!name || !Number.isFinite(amount) || amount <= 0) return
    qRef.current.enqueue({ name, amount })
    setForm({ name: '', amount: '' })
    sync()
  }

  const onDequeue = () => {
    qRef.current.dequeue()
    sync()
  }

  const onClear = () => {
    qRef.current.clear()
    sync()
  }

  return (
    <div style={{ padding: 16, maxWidth: 560 }}>
      <h1>Cola de Cajero</h1>

      <form onSubmit={onEnqueue} style={{ display: 'grid', gap: 8 }}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />
        <input
          name="amount"
          type="number"
          placeholder="Monto a retirar"
          value={form.amount}
          onChange={onChange}
          min="1"
          step="1"
        />
        <button type="submit">Encolar (enqueue)</button>
      </form>

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button onClick={onDequeue} disabled={size === 0}>Atender (dequeue)</button>
        <button onClick={onClear} disabled={size === 0}>Vaciar cola</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <p><strong>Tamaño:</strong> {size}</p>
        <p>
          <strong>Frente (peek):</strong>{' '}
          {front ? `${front.name} — $${front.amount}` : '(vacía)'}
        </p>
      </div>

      <h2 style={{ marginTop: 16 }}>Personas en la cola</h2>
      <ol>
        {queueView.map((p, i) => (
          <li key={`${p.name}-${i}`}>
            <strong>{p.name}</strong> — Retiro: ${p.amount}
          </li>
        ))}
      </ol>
    </div>
  )
}
