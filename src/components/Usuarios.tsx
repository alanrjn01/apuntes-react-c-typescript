import { useEffect } from 'react';
import { Usuario } from '../interfaces/ReqRes';
import { useUsuarios } from '../hooks/useUsuarios';

export const Usuarios = () => {

  const {usuarios,setUsuarios, paginaAnterior, paginaSiguiente} = useUsuarios()

  useEffect(() => {
    setUsuarios()
  }, [])

  const renderItem = (usuario:Usuario) => {
    return (
      <tr key={usuario.id.toString()}>
        <td>
          <img src={usuario.avatar} alt={usuario.first_name}
              style={
                {width:'100px',
                borderRadius:100}
                } />
          </td>
        <td>{usuario.first_name}  {usuario.last_name}</td>
        <td>{usuario.email}</td>
      </tr>
    )
  }
  

  return (
    <>
        <h3>Usuarios:</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
              {
                usuarios.map( usuario => renderItem(usuario))
              }
            </tbody>
        </table>
        <button className='btn btn-danger'
                onClick={() => paginaAnterior()}>
          Cargar Anteriores

        </button>
        &nbsp;
        <button className='btn btn-success'
                onClick={() => paginaSiguiente()}>
          Cargar siguientes

        </button>
    </>
  )
}
