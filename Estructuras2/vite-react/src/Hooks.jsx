import { useState } from "react"

const Hooks = ( { value = 0 } ) => {

    const [contador, setContador] = useState( value )

    const handleAdd = () => {
        setContador( contador + 1 )
    }

    const handleSubsstract = () => {
        setContador( contador - 1 )
    }

    const handleSet = () => {
        setContador( 19 )
    }

    return (
        <>
            <h1> Contador </h1>
            <h2> { contador } </h2>
            <button onClick={ () => handleAdd() }> +1 </button>
            <button onClick={ () => handleSubsstract() }> -1 </button>
            <button onClick={ () => handleSet() }> 19 </button>
        </>
    )
}

export default Hooks