import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerAuth } from '../store/slices/auth/thunks'

export const Registro = () => {

    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        email: "jorge_andres.medina@uao.edu.co",
        password: "123456"
    });

    const onInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        dispatch(registerAuth(email, password));
    }

    const { email, password } = formState;

    return (
        <>
            <h1>Registro</h1>
            <hr />
            <form onSubmit={(event) => onSubmit(event)}>
                <input name="email" type="email" onChange={ (event) => onInputChange(event) } value={email} />
                <input name="password" type="password" onChange={ (event) => onInputChange(event)} value={password} />
                <button type="submit"> Registro </button>
            </form>
        </>
    )
}
