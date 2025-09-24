import React, { createContext, useContext, useRef, useState } from "react";

const PilaLibrosContext = createContext(null);

export const usePilaLibros = () => {
    return useContext(PilaLibrosContext);
};

export const PilaLibrosProvider = ({ children }) => {
    class Stack {
        constructor() {
            this.libros = [ {
        nombre: "Cien años de soledad",
        isbn: "978-0307474728",
        autor: "Gabriel García Márquez",
        editorial: "Editorial Sudamericana",
        },
        {
            nombre: "Don Quijote de la Mancha",
            isbn: "978-8491050290",
            autor: "Miguel de Cervantes",
            editorial: "Editorial Planeta",
        },
        {
            nombre: "La Sombra del Viento",
            isbn: "978-8408172178",
            autor: "Carlos Ruiz Zafón",
            editorial: "Editorial Planeta"}];
        }
        push(value) {
            this.libros.push(value);
        }
        pop() {
            return this.libros.length > 0 ? this.libros.pop() : null;
        }
        peek() {
            return this.libros.length > 0 ? this.libros[this.libros.length - 1] : null;
        }
        isEmpty() {
            return this.libros.length === 0;
        }
        size() {
            return this.libros.length;
        }

        toArray() {
            return this.libros.slice().reverse();
        }
    }

    const stackRef = useRef(new Stack());
    const [, setVersion] = useState(0);

    const pushBook = (book) => {
        stackRef.current.push(book);
        setVersion(v => v + 1);
    };

    const popBook = () => {
        const b = stackRef.current.pop();
        setVersion(v => v + 1);
        return b;
    };

    const peekBook = () => stackRef.current.peek();

    const isEmpty = () => stackRef.current.isEmpty();

    const size = () => stackRef.current.size();

    const getBooks = () => stackRef.current.toArray();

    const value = {
        pushBook,
        popBook,
        peekBook,
        isEmpty,
        size,
        getBooks,
    };

    return (
        <PilaLibrosContext.Provider value={value}>
            {children}
        </PilaLibrosContext.Provider>
    );
};