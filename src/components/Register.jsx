import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerWithEmail } from '../store/slices/authSlice'

export function Register() {
    const dispatch = useDispatch()
    const status = useSelector(s => s.auth.status)
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [acceptTerms, setAcceptTerms] = useState(false)

    // Calcular fuerza de la contraseña
    const passwordStrength = useMemo(() => {
        const pwd = form.password
        if (!pwd) return null

        let strength = 0
        if (pwd.length >= 8) strength++
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
        if (/[0-9]/.test(pwd)) strength++
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++

        if (strength <= 1) return { level: 'weak', text: 'Débil' }
        if (strength <= 2) return { level: 'medium', text: 'Media' }
        return { level: 'strong', text: 'Fuerte' }
    }, [form.password])

    const onSubmit = (e) => {
        e.preventDefault()
        if (!acceptTerms) {
            alert('Debes aceptar los términos y condiciones')
            return
        }
        dispatch(registerWithEmail(form))
    }

    const isLoading = status === 'checking'

    return (
        <section className="register">
            <h2 className="register__title">Crear Cuenta</h2>

            <form onSubmit={onSubmit} className="register__form">
                <div className="input-group">
                    <label htmlFor="name">
                        Nombre completo
                        <span className="required">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-input"
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={(e) => setForm(f => ({...f, name: e.target.value}))}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="reg-email">
                        Correo electrónico
                        <span className="required">*</span>
                    </label>
                    <input
                        id="reg-email"
                        type="email"
                        className="form-input"
                        placeholder="ejemplo@correo.com"
                        value={form.email}
                        onChange={(e) => setForm(f => ({...f, email: e.target.value}))}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="reg-password">
                        Contraseña
                        <span className="required">*</span>
                    </label>
                    <input
                        id="reg-password"
                        type="password"
                        className="form-input"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm(f => ({...f, password: e.target.value}))}
                        required
                        minLength={6}
                    />
                    {passwordStrength && (
                        <div className="register__strength">
                            <div className="register__strength-bar">
                                <div className={`register__strength-bar-fill register__strength-bar-fill--${passwordStrength.level}`} />
                            </div>
                            <div className="register__strength-text">
                                Seguridad: {passwordStrength.text}
                            </div>
                        </div>
                    )}
                </div>

                <div className="register__terms">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        required
                    />
                    <label htmlFor="terms">
                        Acepto los <a href="#terms">términos y condiciones</a>
                    </label>
                </div>

                <button
                    type="submit"
                    className={`submit-btn ${isLoading ? 'btn--loading' : ''}`}
                    disabled={isLoading || !acceptTerms}
                >
                    {!isLoading && 'Crear Cuenta'}
                </button>
            </form>
        </section>
    )
}