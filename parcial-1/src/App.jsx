import { useState } from "react";
import "./App.css";

function App() {
  const [imagenes, setImagenes] = useState([
    {
      id: 1,
      titulo: "Laptop",
      url: "https://picsum.photos/id/1/200/300",
    },
    {
      id: 11,
      titulo: "Río",
      url: "https://picsum.photos/id/11/200/300",
    },
    {
      id: 3,
      titulo: "Tenedores",
      url: "https://picsum.photos/id/23/200/300",
    },
  ]);
  const [titulo, setTitulo] = useState("");
  const [id, setId] = useState("");
  const [filtro, setFiltro] = useState("");

  const imagenesFiltradas = imagenes.filter((img) =>
    img.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAddImagen = (e) => {
    e.preventDefault();
    if (!id || !titulo) return;
    const nuevaImagen = {
      id: Number(id),
      titulo,
      url: `https://picsum.photos/id/${id}/200/300`,
    };
    setImagenes((prev) => [...prev, nuevaImagen]);
    setId("");
    setTitulo("");
  };

  const ActualizarFiltro = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <div className="App">
      <h1>Lista de Imágenes</h1>
      <form onSubmit={handleAddImagen}>
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <button type="submit">Agregar Imagen</button>
      </form>
      <input
        type="text"
        className="filter-input"
        placeholder="Buscar por título"
        value={filtro}
        onChange={ActualizarFiltro}
      />
      <div className="lista-de-imagenes">
        {imagenesFiltradas.map((img) => (
          <div key={img.id} className="tarjeta">
            <img src={img.url} alt={img.titulo} width={200} height={300} />
            <div className="texto">{img.titulo}</div>
            <div className="texto">ID: {img.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
