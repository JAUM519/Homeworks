import React, { useState, useEffect } from 'react'
import useCollection from './useCollection'

export const Crud = () => {
  const [user, setUser] = useState({ name: '' })
  const {
    add,
    getAll,
    updateDocById,
    deleteDocById,
    results,
    isPending
  } = useCollection('users')

  useEffect(() => {
    getAll()
  }, [])

  const save = async () => {
    if (user.id) {
      await updateDocById(user.id, { name: user.name })
    } else {
      await add(user)
    }
    setUser({ name: '' })
    await getAll()
  }

  const edit = (item) => {
    setUser(item)
  }

  const remove = async (id) => {
    await deleteDocById(id)
    await getAll()
  }

  return (
    <div className="card">
      <input
        type="text"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        value={user.name}
        placeholder="Nombre"
      />
      <button onClick={save}>
        {user.id ? 'Actualizar' : 'Guardar'}
      </button>

      {isPending ? <p>Cargando...</p> : null}

      <ul>
        {results.map((item) => (
          <li key={item.id}>
            {item.name}
            <li className='upde'>
            <button onClick={() => edit(item)}>Editar</button>
            <button onClick={() => remove(item.id)}>Eliminar</button>
            </li>
          </li>
        ))}
      </ul>
    </div>
  )
}
