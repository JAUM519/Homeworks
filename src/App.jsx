import { useSelector } from 'react-redux'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Navbar } from './components/Navbar'

export function App() {
    const status = useSelector(s => s.auth.status)
    const { email, displayName } = useSelector(s => s.auth)

    if (status === 'checking') {
        return (
            <main className="app__container">
                <div className="app__loading">
                    <div className="app__loading-spinner" />
                    <p className="app__loading-text">Verificando sesión...</p>
                </div>
            </main>
        )
    }

    return (
        <>
            <Navbar />

            <main className="app__container">
                {status === 'authenticated' ? (
                    <section className="app__welcome">
                        <div className="welcome-icon">🎉</div>
                        <h1>¡Bienvenido{displayName ? `, ${displayName}` : ''}!</h1>
                        <p className="welcome-email">{email}</p>
                        <div className="mt-lg">
                            <p className="text-muted">
                                Has iniciado sesión exitosamente en la aplicación.
                            </p>
                        </div>
                    </section>
                ) : (
                    <div className="app__auth-section">
                        <Login />
                        <Register />
                    </div>
                )}
            </main>
        </>
    )
}