import { useEffect, useRef, useState } from 'react'
import { Stack } from '../structures/Stack'

export default function BooksStack() {
  const stackRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    isbn: '',
    author: '',
    editorial: '',
  })
  const [books, setBooks] = useState([])
  const [top, setTop] = useState(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    const s = new Stack()
    // Mock data
    s.push({ name: 'Clean Code', isbn: '9780132350884', author: 'Robert C. Martin', editorial: 'Prentice Hall' })
    s.push({ name: 'You Don’t Know JS', isbn: '9781491904244', author: 'Kyle Simpson', editorial: "O'Reilly" })
    s.push({ name: 'Eloquent JavaScript', isbn: '9781593279509', author: 'Marijn Haverbeke', editorial: 'No Starch Press' })
    stackRef.current = s
    syncState()
  }, [])

  const syncState = () => {
    const s = stackRef.current
    setBooks(s.print())
    setTop(s.peek())
    setSize(s.size())
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const { name, isbn, author, editorial } = form
    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) return
    stackRef.current.push({ name, isbn, author, editorial })
    setForm({ name: '', isbn: '', author: '', editorial: '' })
    syncState()
  }

  const handlePop = () => {
    stackRef.current.pop()
    syncState()
  }

  const handleClear = () => {
    stackRef.current.clear()
    syncState()
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Stack de Libros</h1>

      <form onSubmit={handleAdd} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
        <input name="author" placeholder="Autor" value={form.author} onChange={handleChange} />
        <input name="editorial" placeholder="Editorial" value={form.editorial} onChange={handleChange} />
        <button type="submit">Agregar (push)</button>
      </form>

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button onClick={handlePop} disabled={size === 0}>Quitar tope (pop)</button>
        <button onClick={handleClear} disabled={size === 0}>Limpiar stack</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <p><strong>Tamaño:</strong> {size}</p>
        <p><strong>Tope (peek):</strong> {top ? `${top.name} — ${top.author}` : '(vacío)'}</p>
      </div>

      <h2 style={{ marginTop: 16 }}>Contenido de la pila (más reciente primero)</h2>
      <ul>
        {books.map((b, i) => (
          <li key={`${b.isbn}-${i}`}>
            <strong>{b.name}</strong> — ISBN: {b.isbn} — Autor: {b.author} — Editorial: {b.editorial}
          </li>
        ))}
      </ul>
    </div>
  )
}
