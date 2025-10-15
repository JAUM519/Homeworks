import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { savePostToFirebase, saveNotification } from "../store/thunks";

export default function Feed() {
  const dispatch = useDispatch();
  const { posts } = useSelector(s => s.social);
  const { displayName, email } = useSelector(s => s.auth);
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    const author = displayName || email || "Anónimo";
    const post = { id: crypto.randomUUID(), author, text: t, ts: Date.now() };
    dispatch(savePostToFirebase(post));

    const notif = { id: crypto.randomUUID(), text: `${author} publicó: ${t}`, ts: Date.now() };
    dispatch(saveNotification(notif));

    setText("");
  };

  return (
    <div style={{padding:16}}>
      <h2>Feed Global</h2>
      <form onSubmit={submit} style={{display:"flex",gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Escribe un post..." />
        <button type="submit">Publicar</button>
      </form>
      <ul>
        {posts.slice().reverse().map(p => (
          <li key={p.id} style={{border:"1px solid #ddd",marginTop:8,padding:8}}>
            <strong>{p.author}</strong>
            <div>{p.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
