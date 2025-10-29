import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div>
      <h1>Página pública</h1>
      <Link to="/login">Ir al Login</Link>
    </div>
  )
}
