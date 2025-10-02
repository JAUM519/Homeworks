import React, { useState } from "react";

export default function FormularioPersona({ onAgregar }) {
    const [nombre, setNombre] = useState("");
    const [retiro, setRetiro] = useState("");
    const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim() || retiro === "") return;
        onAgregar({
            nombre: nombre.trim(),
            retiro: Number(retiro),
            fecha
        });
        setNombre("");
        setRetiro("");
        setFecha(new Date().toISOString().slice(0, 10));
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20, padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
            <h2>Agregar persona a la cola</h2>
            <div style={{ marginBottom: 8 }}>
                <label>Nombre</label><br />
                <input value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div style={{ marginBottom: 8 }}>
                <label>Monto de retiro</label><br />
                <input type="number" value={retiro} onChange={e => setRetiro(e.target.value)} required min="0" />
            </div>
            <div style={{ marginBottom: 8 }}>
                <label>Fecha</label><br />
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
            </div>
            <button type="submit">Agregar a la cola</button>
        </form>
    );
}