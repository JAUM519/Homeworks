import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export function Login() {
  const [username, setUsername] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username.trim()) return
    login(username)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
