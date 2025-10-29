import { useEffect, useRef, useState } from 'react'
import { LinkedList } from '../structures/LinkedList'

export default function SongsLinkedList() {
  const listRef = useRef(null)
  const [current, setCurrent] = useState(null)
  const [queue, setQueue] = useState([])

  useEffect(() => {
    const l = new LinkedList()
    // datos de ejemplo
    ;['Song A', 'Song B', 'Song C', 'Song D'].forEach(s => l.append(s))
    listRef.current = l
    setQueue(l.print())
    setCurrent(l.currentTrack())
  }, [])

  const handlePlayNext = () => {
    const played = listRef.current.nextTrack()
    setCurrent(listRef.current.currentTrack())
  }

  const handleReset = () => {
    const cur = listRef.current.reset()
    setCurrent(cur)
  }

  const handleRemoveFirst = () => {
    listRef.current.remove(0)
    setQueue(listRef.current.print())
    setCurrent(listRef.current.currentTrack())
  }

  return (
    <div>
      <h1>Linked List: Playlist</h1>
      <p><strong>Current:</strong> {current ?? '(none)'}</p>
      <button onClick={handlePlayNext}>Play next</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleRemoveFirst}>Remove first</button>

      <h3>Queue</h3>
      <ul>
        {queue.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  )
}
