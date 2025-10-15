import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../store/thunks";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(s => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  if (status === "authenticated") return <Navigate to="/" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLogin(form));
  };

  return (
    <div style={{maxWidth:360,margin:"40px auto"}}>
      <h2>Ingresar</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="email" type="email" value={form.email}
               onChange={e=>setForm({...form,email:e.target.value})} required />
        <input placeholder="password" type="password" value={form.password}
               onChange={e=>setForm({...form,password:e.target.value})} required />
        <button type="submit" disabled={status==="checking"}>Entrar</button>
      </form>
      {errorMessage && <p style={{color:"crimson"}}>{errorMessage}</p>}
      <p><Link to="/register">Crear cuenta</Link></p>
    </div>
  );
}
