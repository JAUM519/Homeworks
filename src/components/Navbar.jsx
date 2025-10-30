import { useDispatch, useSelector } from 'react-redux'
import { logoutFirebase } from '../store/slices/authSlice'

export function Navbar() {
  const dispatch = useDispatch()
  const { status, displayName, photoURL } = useSelector(s => s.auth)

  return (
    <nav style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 8 }}>
      <strong>Firebase Auth</strong>
      <span style={{ flex: 1 }} />
      {status === 'authenticated' ? (
        <>
          {photoURL && <img src={photoURL} alt="avatar" width={28} height={28} style={{ borderRadius: '50%' }} />}
          <span>{displayName || 'Usuario'}</span>
          <button onClick={()=>dispatch(logoutFirebase())}>Logout</button>
        </>
      ) : (
        <span>Invitado</span>
      )}
    </nav>
  )
}
