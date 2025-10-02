import React from 'react'

export const Son = React.memo(({ numero, increment, elegirNumero }) => {
  return (
    <button
      className="btn btn-primary mr-3"
      onClick={() => {
        increment(numero)
        elegirNumero(numero)
      }}
    >
      {numero}
    </button>
  )
})
