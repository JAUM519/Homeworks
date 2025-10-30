import { useDispatch, useSelector } from 'react-redux'
import { push, pop, clear } from '../store/slices/stackSlice'
import { useState } from 'react'

export default function Stack() {
  const items = useSelector((s) => s.stack.items)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')

  const handlePush = (e) => {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    dispatch(push({ title: t, id: crypto.randomUUID() }))
    setTitle('')
  }

  const top = items.length ? items[items.length - 1] : null

  return (
    <section style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, marginTop: 16 }}>
      <h2>Stack (Redux)</h2>

      <form onSubmit={handlePush} style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Título del elemento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">push</button>
      </form>

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={() => dispatch(pop())} disabled={items.length === 0}>pop</button>
        <button onClick={() => dispatch(clear())} disabled={items.length === 0}>clear</button>
      </div>

      <p style={{ marginTop: 8 }}>
        <strong>Top:</strong> {top ? top.title : '(vacío)'}
      </p>

      <h4>Contenido</h4>
      <ul>
        {[...items].reverse().map((it) => (
          <li key={it.id}>{it.title}</li>
        ))}
      </ul>
    </section>
  )
}
