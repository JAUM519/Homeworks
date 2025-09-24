import React from "react";
import { usePilaLibros } from "./PilaLibrosContext";

export default function ListaLibros() {
    const { getBooks, popBook, peekBook, isEmpty, size } = usePilaLibros();
    const libros = getBooks();

    return (
        <div>
            <h3>Pila de libros (ultimo arriba)</h3>
            <div>Cantidad de Libros: {size()}</div>
            <button onClick={() => {
                const popped = popBook();
                if (popped) alert(
                    `Desapilado:\nNombre: ${popped.nombre}\nISBN: ${popped.isbn || "—"}\nAutor: ${popped.autor || "—"}\nEditorial: ${popped.editorial || "—"}`
                );
            }} disabled={isEmpty()}>
                Desapilar (pop)
            </button>

            <ul>
                {libros.map((libro, idx) => (
                    <li key={libro.isbn || idx}>
                        <strong>Nombre: {libro.nombre}</strong>
                        <div>ISBN: {libro.isbn || "—"}</div>
                        <div>Autor: {libro.autor || "—"}</div>
                        <div>Editorial: {libro.editorial || "—"}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}