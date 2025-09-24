import React from "react";
import ReactDOM from "react-dom/client";
import { PilaLibrosProvider } from "./PilaLibrosContext";
import FormularioLibro from "./FormularioLibro";
import ListaLibros from "./ListaLibros";

export default function Challenge8Index() {
    return (
        <PilaLibrosProvider>
            <h2>Challenge 8 — Pila de libros</h2>
            <FormularioLibro />
            <ListaLibros />
        </PilaLibrosProvider>
    );
}

