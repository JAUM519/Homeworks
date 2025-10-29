import { Routes, Route, Link } from 'react-router-dom'
import SongsLinkedList from './Pagina challenge 7/SongPlayer'
import BrowserHistoryDoubly from './Pagina challenge 7/BrowserHistory'

export function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Songs (Linked)</Link>
        <Link to="/history">Browser (Doubly)</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SongsLinkedList />} />
        <Route path="/history" element={<BrowserHistoryDoubly />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  )
}
