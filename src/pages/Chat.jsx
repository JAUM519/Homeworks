import { useEffect, useMemo, useState } from 'react'
import { rtdb } from '../firebase/config'
import {
  ref, onValue, push, serverTimestamp, set, off,
} from 'firebase/database'

export default function Chat() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  const msgsRef = useMemo(() => ref(rtdb, 'messages'), [])

  useEffect(() => {
    const unsub = onValue(msgsRef, (snap) => {
      const data = snap.val() ?? {}
      const arr = Object.entries(data).map(([id, v]) => ({ id, ...v }))
        .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
      setMessages(arr)
    })
    return () => off(msgsRef, 'value', unsub)
  }, [msgsRef])

  const send = async (e) => {
    e.preventDefault()
    const txt = text.trim()
    if (!txt) return
    const newRef = push(msgsRef)
    await set(newRef, {
      text: txt,
      createdAt: serverTimestamp(),
    })
    setText('')
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1>Chat RTDB</h1>

      <section style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, minHeight: 240 }}>
        {messages.length === 0 ? (
          <p>Sin mensajes</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {messages.map(m => (
              <li key={m.id} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                {m.text}
              </li>
            ))}
          </ul>
        )}
      </section>

      <form onSubmit={send} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un mensaje…"
          style={{ flex: 1 }}
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  )
}
