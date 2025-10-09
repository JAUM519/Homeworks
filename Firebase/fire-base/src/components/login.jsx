import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoginWithEmailPassword, startGoogleLogin } from "../store/slices/auth/thunks";


export default function Login() {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);

    const [form, setForm] = useState({ email: "", password: "" });

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword({ email: form.email, password: form.password }));
    };

    return (
        <div className="card">
        <h2>Iniciar sesión</h2>
        <form onSubmit={onSubmit}>
            <div>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={onChange} required />
            </div>
            <button type="submit">Entrar</button>
            <button type="button" onClick={() => dispatch(startGoogleLogin())}>
            Iniciar sesión con Google
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
        </div>
    );
}