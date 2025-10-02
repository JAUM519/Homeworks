import React, { useState } from "react";
import { usePilaLibros } from "./PilaLibrosContext";

export default function FormularioLibro() {
    const { pushBook } = usePilaLibros();
    const [nombre, setNombre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [editorial, setEditorial] = useState("");
    const [autor, setAutor] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        pushBook({ nombre: nombre.trim(), isbn: isbn.trim(), autor: autor.trim(), editorial: editorial.trim() });
        setNombre("");
        setIsbn("");
        setAutor("");
        setEditorial("");
    };

    return (
        <form onSubmit={submit}>
            <div>
                <label>Nombre</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div>
                <label>ISBN</label>
                <input value={isbn} onChange={e => setIsbn(e.target.value)} />
            </div>
            <div>
                <label>Autor</label>
                <input value={autor} onChange={e => setAutor(e.target.value)} />
            </div>
            <div>
                <label>Editorial</label>
                <input value={editorial} onChange={e => setEditorial(e.target.value)} />
            </div>
            <button type="submit">Apilar libro</button>
        </form>
    );
}