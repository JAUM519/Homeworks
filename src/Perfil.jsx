import React from "react";
import { useAuth } from "./context/AuthContext";

export default function Perfil() {
  const { user } = useAuth();
  return (
    <section style={{ padding: 16 }}>
      <h1>Perfil (Privado)</h1>
      <p>Usuario actual: <strong>{user?.username}</strong></p>
    </section>
  );
}
