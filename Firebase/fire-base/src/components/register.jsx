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
        <div className="card">
        <h1>Registro</h1>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" onChange={onInputChange} value={email} />
            <input name="password" type="password" onChange={onInputChange} value={password} />
            <button type="submit">Registro</button>
        </form>
        </div>
    );
}
