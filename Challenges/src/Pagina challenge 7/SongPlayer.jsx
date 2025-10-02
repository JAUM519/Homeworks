import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

class NodoCanciones {
  constructor(song) {
    this.song = song;
    this.next = null;
  }
}


function buildSongList(songs) {
  if (!songs || songs.length === 0) return null;
  const head = new NodoCanciones(songs[0]);
  let cur = head;
  for (let i = 1; i < songs.length; i++) {
    const node = new NodoCanciones(songs[i]);
    cur.next = node;
    cur = node;
  }
  return head;
}

const mockSongs = [
  { id: 1, title: 'Canción A', artist: 'Artista 1', duration: '3:12' },
  { id: 2, title: 'Canción B', artist: 'Artista 2', duration: '2:48' },
  { id: 3, title: 'Canción C', artist: 'Artista 3', duration: '4:05' },
];

export default function SongPlayer() {
  const [head] = useState(() => buildSongList(mockSongs));
  const [current, setCurrent] = useState(head);
  const navigate = useNavigate();

  const onNext = () => {
    if (current && current.next) setCurrent(current.next);
  };

  const onRestart = () => {
    setCurrent(head);
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Reproductor - Linked List</h3>
      {current ? (
        <div>
          <p><strong>{current.song.title}</strong> — {current.song.artist} ({current.song.duration})</p>
          <div style={{ gap: 8 }}>
            <button onClick={onNext} disabled={!current.next}>Siguiente</button>
            <button onClick={onRestart} disabled={current === head}>Reiniciar</button>
          </div>
          <p style={{ marginTop: 12, color: '#666' }}>(La lista contiene mocked data)</p>
        </div>
      ) : (
        <p>No hay canciones en la lista.</p>
      )}
    </div>
  )
}
