import React, { useState, useCallback } from 'react'
import { Son } from './Challenge 5 Son'

export const Father = () => {
  const list = [2, 4, 6, 8, 10]
  const [valor, setValor] = useState(0)
  const [numeroElegido, setNumeroElegido] = useState(null)

  const increment = useCallback((num) => {
    setValor(v => v + num);    
  }, []);

  const elegirNumero = useCallback((num) => {
    setNumeroElegido(num);
  }, []);

  return (
    <div>
      <h1>Challenge 5</h1>
      <p>Total: {valor}</p>
      <p>Numero Elegido: {numeroElegido !== null ? numeroElegido : 'Ninguno'}</p>
      <hr />

        {list.map((n) => (
            <Son
                key={n}            
                numero={n}
                increment={increment}
                elegirNumero={elegirNumero}
            />
        ))
      }

    </div>
  )
}
