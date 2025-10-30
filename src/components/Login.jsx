import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithEmail, loginWithGoogle } from '../store/slices/authSlice'

export function Login() {
  const dispatch = useDispatch()
  const status = useSelector(s => s.auth.status)
  const error = useSelector(s => s.auth.errorMessage)
  const [form, setForm] = useState({ email: '', password: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginWithEmail(form))
  }

  return (
    <section style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
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
        <button type="submit" disabled={status==='checking'}>Login con Email</button>
      </form>

      <div style={{ marginTop: 8 }}>
        <button onClick={()=>dispatch(loginWithGoogle())} disabled={status==='checking'}>
          Login con Google
        </button>
      </div>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </section>
  )
}
