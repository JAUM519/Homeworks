import React, { useRef, useState, useEffect } from "react";
import Cola from "./Cola";
import FormularioPersona from "./FormularioPersona";
import VistaCola from "./VistaCola";

export default function Challenge9Index() {
    const colaRef = useRef(new Cola());
    const [lista, setLista] = useState([]);

    const agregarPersona = (persona) => {
        const nueva = { ...persona, id: Date.now() };
        colaRef.current.enqueue(nueva);
        setLista(colaRef.current.toArray());
    };

    const atenderSiguiente = () => {
        colaRef.current.dequeue();
        setLista(colaRef.current.toArray());
    };

    return (
        <div style={{ maxWidth: 900, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
            <h1>Cola del Cajero</h1>
            <FormularioPersona onAgregar={agregarPersona} />
            <VistaCola cola={colaRef.current} lista={lista} onAtender={atenderSiguiente} />
        </div>
    );
}