import { useEffect, useRef, useState } from 'react'
import { DoublyLinkedList } from '../structures/DoublyLinkedList'

export default function BrowserHistoryDoubly() {
  const histRef = useRef(null)
  const [current, setCurrent] = useState(null)
  const [input, setInput] = useState('')
  const [all, setAll] = useState([])

  useEffect(() => {
    const h = new DoublyLinkedList()
    // datos de ejemplo
    ;['/home', '/products', '/products/42', '/cart'].forEach(p => h.visit(p))
    histRef.current = h
    setCurrent(h.peekCurrent())
    setAll(h.printFromHead())
  }, [])

  const handleVisit = () => {
    const val = input.trim()
    if (!val) return
    histRef.current.visit(val)
    setCurrent(histRef.current.peekCurrent())
    setAll(histRef.current.printFromHead())
    setInput('')
  }

  const handleBack = () => {
    histRef.current.back()
    setCurrent(histRef.current.peekCurrent())
  }

  const handleForward = () => {
    histRef.current.forward()
    setCurrent(histRef.current.peekCurrent())
  }

  return (
    <div>
      <h1>Doubly Linked List: Browser History</h1>
      <p><strong>Current:</strong> {current ?? '(none)'}</p>

      <input
        type="text"
        placeholder="/new-path"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleVisit}>Visit</button>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleForward}>Forward</button>

      <h3>All visited (desde el inicio)</h3>
      <ul>
        {all.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  )
}
