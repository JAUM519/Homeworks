import { useSelector } from "react-redux";

export default function Notifications() {
  const list = useSelector(s => s.social.notifications);
  return (
    <div style={{padding:16}}>
      <h2>Notificaciones Globales (Pila)</h2>
      {list.length === 0 && <p>No hay notificaciones.</p>}
      <ol>
        {list.map(n => <li key={n.id}>{n.text}</li>)}
      </ol>
    </div>
  );
}
