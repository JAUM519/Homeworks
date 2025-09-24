import React from "react";

export default function VistaCola({ cola, lista = [], onAtender }) {
    const tamaño = cola ? cola.length() : 0;
    const siguiente = cola ? cola.peek() : null;
    const elementos = lista.length ? lista : (cola ? cola.toArray() : []);

    return (
        <section style={{ padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
            <h2>Vista de la cola</h2>
            <p>Tamaño de la cola: <strong>{tamaño}</strong></p>

            <div style={{ marginBottom: 12 }}>
                <h3>Siguiente en atender</h3>
                {siguiente ? (
                    <div style={{ padding: 8, background: "#454546", borderRadius: 4 }}>
                        <div><strong>Nombre:</strong> {siguiente.nombre}</div>
                        <div><strong>Retiro:</strong> ${siguiente.retiro}</div>
                        <div><strong>Fecha:</strong> {siguiente.fecha}</div>
                    </div>
                ) : (
                    <div>No hay personas en la cola.</div>
                )}
            </div>

            <button onClick={onAtender} disabled={tamaño === 0} style={{ marginBottom: 12 }}>
                Atender siguiente (desencolar)
            </button>

            <h3>Lista completa</h3>
            <ul>
                {elementos.map((p, i) => (
                    <li key={p.id || i} style={{ padding: 6, borderBottom: "1px solid #eee" }}>
                        <strong>{i + 1}. {p.nombre}</strong> — Retiro: ${p.retiro} — Fecha: {p.fecha}
                    </li>
                ))}
            </ul>
        </section>
    );
}