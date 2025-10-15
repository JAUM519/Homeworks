import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRegister } from "../store/thunks";
import { Navigate, Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(s => s.auth);
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });

  if (status === "authenticated") return <Navigate to="/" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startRegister(form));
  };

  return (
    <div style={{maxWidth:360,margin:"40px auto"}}>
      <h2>Registro</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="nombre" value={form.displayName}
               onChange={e=>setForm({...form,displayName:e.target.value})} />
        <input placeholder="email" type="email" value={form.email}
               onChange={e=>setForm({...form,email:e.target.value})} required />
        <input placeholder="password" type="password" value={form.password}
               onChange={e=>setForm({...form,password:e.target.value})} required />
        <button type="submit" disabled={status==="checking"}>Crear</button>
      </form>
      {errorMessage && <p style={{color:"crimson"}}>{errorMessage}</p>}
      <p><Link to="/login">¿Tienes cuenta? Inicia sesión</Link></p>
    </div>
  );
}
