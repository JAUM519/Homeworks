import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerWithEmail } from '../store/slices/authSlice'

export function Register() {
  const dispatch = useDispatch()
  const status = useSelector(s => s.auth.status)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerWithEmail(form))
  }

  return (
    <section style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h2>Registro</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e)=>setForm(f=>({...f, name:e.target.value}))}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm(f=>({...f, email:e.target.value}))}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>setForm(f=>({...f, password:e.target.value}))}
        />
        <button type="submit" disabled={status==='checking'}>Crear cuenta</button>
      </form>
    </section>
  )
}
