import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
