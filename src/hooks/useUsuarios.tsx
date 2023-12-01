import { useRef, useState } from 'react';
import { reqResApi } from '../api/reqRes';
import { ReqResListado, Usuario } from '../interfaces/ReqRes';

export const useUsuarios = () => {

  const [usuarios, setusuarios] = useState<Usuario[]>([])

  //useRef sirve para almacenar referencias
  //una vez que se cambie su valor, la variable sigue siendo la misma
  //y no dispara el procedimiento para recargar el html
  const paginaRef = useRef<number>(1)

  const cargarUsuarios = async() => {
    //llamado a la api
    //el get es de tipo generico, por lo que puedo especificarle
    //el tipo de retorno, en este caso 'ReqResListado'
    try{
      const res = await reqResApi.get<ReqResListado>('/users',
        {params: {page:paginaRef.current}}
      )
      if (res.data.data.length > 0) {
        setusuarios(res.data.data)
      } else{
        alert("no hay nada mas que cargar")
        paginaRef.current = paginaRef.current - 1
      }
    }
    catch(err){
      console.error("Ha ocurrido un error")
    }
  }

  const paginaSiguiente = () => {
    paginaRef.current = paginaRef.current + 1
    cargarUsuarios()
  }

  const paginaAnterior = () => {
    if (paginaRef.current > 1){
      paginaRef.current = paginaRef.current - 1
      cargarUsuarios()
    }
  }

  return {
    usuarios: usuarios,
    setUsuarios: cargarUsuarios,
    paginaAnterior: paginaAnterior,
    paginaSiguiente: paginaSiguiente
  }
  
}
