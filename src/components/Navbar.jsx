import { useDispatch, useSelector } from 'react-redux'
import { logoutFirebase } from '../store/slices/authSlice'

export function Navbar() {
    const dispatch = useDispatch()
    const { status, displayName, photoURL } = useSelector(s => s.auth)

    return (
        <nav className="navbar">
            <div className="navbar__brand">
                🔥 Firebase Auth
            </div>

            <div className="navbar__content">
                {status === 'authenticated' ? (
                    <div className="navbar__user">
                        {photoURL && (
                            <img
                                src={photoURL}
                                alt="avatar"
                                className="navbar__user-avatar"
                            />
                        )}
                        <span className="navbar__user-name">
              {displayName || 'Usuario'}
            </span>
                        <button
                            className="btn btn--danger btn--sm"
                            onClick={() => dispatch(logoutFirebase())}
                        >
                            Salir
                        </button>
                    </div>
                ) : (
                    <span className="navbar__guest">Modo Invitado</span>
                )}
            </div>
        </nav>
    )
}