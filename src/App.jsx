import { useSelector } from 'react-redux'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Navbar } from './components/Navbar'

export function App() {
  const status = useSelector(s => s.auth.status)
  const email = useSelector(s => s.auth.email)

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <Navbar />

      {status === 'authenticated' ? (
        <section>
          <h1>Bienvenido</h1>
          <p>Sesión iniciada: {email}</p>
        </section>
      ) : (
        <section style={{ display: 'grid', gap: 16 }}>
          <Login />
          <Register />
        </section>
      )}
    </main>
  )
}
