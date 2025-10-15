import { useDispatch, useSelector } from "react-redux";
import { enqueueMsg, dequeueMsg, clearQueue } from "../store/slices/socialSlice";
import { sendDM } from "../store/thunksDM";
import { useState } from "react";

export default function Directs() {
  const dispatch = useDispatch();
  const { email } = useSelector((s) => s.auth);
  const { queue, inbox } = useSelector((s) => s.social);
  const [form, setForm] = useState({ to: "", text: "" });

  // Encolar mensaje (sin enviarlo)
  const enqueue = (e) => {
    e.preventDefault();
    const to = form.to.trim().toLowerCase();
    const text = form.text.trim();
    if (!to || !text) return;

    const msg = { id: crypto.randomUUID(), from: email, to, text, ts: Date.now() };
    dispatch(enqueueMsg(msg));
    setForm({ to: "", text: "" });
  };

  // Enviar siguiente mensaje en cola
  const sendNext = () => {
    if (!queue.length) return;
    const nextMsg = queue[0];
    dispatch(sendDM(nextMsg)); // Guardar en Firestore
    dispatch(dequeueMsg());    // Sacar de la cola
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Mensajes Directos (Cola y Bandeja de entrada)</h2>

      <form onSubmit={enqueue} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          placeholder="Correo destinatario"
          type="email"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        />
        <input
          placeholder="Mensaje"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
        <button type="submit">Encolar</button>
      </form>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={sendNext} disabled={!queue.length}>Enviar siguiente</button>
        <button onClick={() => dispatch(clearQueue())} disabled={!queue.length}>Vaciar cola</button>
      </div>

      <h4>📬 Cola de envío:</h4>
      {queue.length === 0 && <p>No hay mensajes en cola.</p>}
      <ul>
        {queue.map((dm, i) => (
          <li key={dm.id}>
            {i === 0 ? "➡️ " : ""}<strong>De:</strong> {dm.from} → {dm.to} : {dm.text}
          </li>
        ))}
      </ul>

      <h4 style={{ marginTop: 20 }}>📥 Bandeja de entrada:</h4>
      {inbox.length === 0 && <p>No hay mensajes recibidos.</p>}
      <ul>
        {inbox.map((dm) => (
          <li key={dm.id}>
            <strong>De:</strong> {dm.from} : {dm.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
