import { useEffect, useState } from 'react'
import {
  collection, addDoc, onSnapshot, query, orderBy,
  doc, updateDoc, deleteDoc
} from 'firebase/firestore'
import { db } from '../firebase/config'

const COL = 'items' // colección en Firestore

export default function Inventory() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', price: '' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', price: '' })

  useEffect(() => {
    const q = query(collection(db, COL), orderBy('name'))
    const unsub = onSnapshot(q, (snap) => {
      const rows = []
      snap.forEach((d) => rows.push({ id: d.id, ...d.data() }))
      setItems(rows)
    })
    return () => unsub()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onAdd = async (e) => {
    e.preventDefault()
    const name = form.name.trim()
    const price = Number(form.price)
    if (!name || !Number.isFinite(price) || price < 0) return
    await addDoc(collection(db, COL), { name, price })
    setForm({ name: '', price: '' })
  }

  const startEdit = (row) => {
    setEditingId(row.id)
    setEditForm({ name: row.name, price: String(row.price) })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', price: '' })
  }

  const onEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((f) => ({ ...f, [name]: value }))
  }

  // UPDATE en Firestore
  const saveEdit = async (id) => {
    const name = editForm.name.trim()
    const price = Number(editForm.price)
    if (!name || !Number.isFinite(price) || price < 0) return
    await updateDoc(doc(db, COL, id), { name, price })
    cancelEdit()
  }

  // DELETE en Firestore
  const removeItem = async (id) => {
    await deleteDoc(doc(db, COL, id))
    if (editingId === id) cancelEdit()
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1>Challenge 12 — Firestore Update/Delete</h1>

      <form onSubmit={onAdd} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={onChange}
          min="0"
          step="0.01"
        />
        <button type="submit">Agregar</button>
      </form>

      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Nombre</th>
            <th style={{ textAlign: 'left' }}>Precio</th>
            <th style={{ textAlign: 'left' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.id}>
              <td>
                {editingId === row.id ? (
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={onEditChange}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editForm.price}
                    onChange={onEditChange}
                  />
                ) : (
                  `$${row.price}`
                )}
              </td>
              <td style={{ display: 'flex', gap: 8 }}>
                {editingId === row.id ? (
                  <>
                    <button onClick={() => saveEdit(row.id)}>Guardar</button>
                    <button onClick={cancelEdit} type="button">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(row)}>Editar</button>
                    <button onClick={() => removeItem(row.id)} type="button">Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan="3">Sin datos</td></tr>
          )}
        </tbody>
      </table>
    </main>
  )
}
