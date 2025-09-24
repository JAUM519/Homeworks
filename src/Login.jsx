import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ usuario: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const goBackTo = "/"

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const name = form.usuario.trim();
    if (!name) return;
    login(name);
    navigate(goBackTo, { replace: true });
  }

  return (
    <section style={{ padding: 16 }}>
      <h1>Página de Login</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 320, margin: "0 auto" }}>
        <label>
          Usuario
          <input
            name="usuario"
            type="text"
            value={form.usuario}
            onChange={onChange}
            placeholder="Escribe tu usuario"
          />
        </label>
        <label>
          Contraseña
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
          />
        </label>
        <button type="submit">Ingresar</button>
      </form>
      <p style={{ marginTop: 8, color: "#666" }}>Fake Login, Challenge 6</p>
    </section>
  )
}
