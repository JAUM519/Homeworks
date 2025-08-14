const Functions = ( { value = 100 } ) => {

    const handleAdd = () => {
        console.log( "llamando handleAdd" )
    }

    return (
        <>
            <h1> Contador "consola" </h1>
            <span> { value } </span>
            <button onClick={ () => handleAdd()}> +1 </button>
        </>
    )
}

export default Functions