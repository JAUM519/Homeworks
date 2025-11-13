import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithEmail, loginWithGoogle } from '../store/slices/authSlice'
import GoogleLogo from '../assets/google-icon.svg'

export function Login() {
    const dispatch = useDispatch()
    const status = useSelector(s => s.auth.status)
    const error = useSelector(s => s.auth.errorMessage)
    const [form, setForm] = useState({ email: '', password: '' })

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginWithEmail(form))
    }

    const isLoading = status === 'checking'

    return (
        <section className="login">
            <h2 className="login__title">Iniciar Sesión</h2>

            <form onSubmit={onSubmit} className="login__form">
                <div className="input-group">
                    <label htmlFor="email">
                        Correo electrónico
                        <span className="required">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder="ejemplo@correo.com"
                        value={form.email}
                        onChange={(e) => setForm(f => ({...f, email: e.target.value}))}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">
                        Contraseña
                        <span className="required">*</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm(f => ({...f, password: e.target.value}))}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`submit-btn ${isLoading ? 'btn--loading' : ''}`}
                    disabled={isLoading}
                >
                    {!isLoading && 'Iniciar Sesión'}
                </button>
            </form>

            <div className="login__divider">o continuar con</div>

            <div className="login__social">
                <button
                    className={`google-btn ${isLoading ? 'btn--loading' : ''}`}
                    onClick={() => dispatch(loginWithGoogle())}
                    disabled={isLoading}
                >
                    {!isLoading && (
                        <>
                            <img
                                src={GoogleLogo}
                                alt="Google logo"
                                className="google-logo"
                            />
                            Google
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="login__error">
                    ⚠️ {error}
                </div>
            )}
        </section>
    )
}