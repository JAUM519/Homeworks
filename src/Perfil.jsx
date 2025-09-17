import React from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <section style={{ padding: 16 }}>
      <h1>Perfil (Privado)</h1>
      <p>Usuario actual: <strong>{user?.username}</strong></p>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </section>
  );
}
