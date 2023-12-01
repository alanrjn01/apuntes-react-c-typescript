import { useEffect, useReducer } from "react"

interface AuthState {
  validando: boolean,
  token: string | null,
  username: string,
  nombre: string
}

const initialState:AuthState = {
  validando: true,
  token: null,
  username: '',
  nombre: ''
}

type LoginPayload = {
  username: string,
  nombre: string
}

//la accion la declaro como tipo 
//type: tipo de accion
//payload: contenido de la accion
//El auth action puede ser de tipo logout o login
type AuthAction = 
  | {type: 'logout'}
  | {type: 'login', payload: LoginPayload}

//state -> estado
//action -> la accion modifica el state
//a partir de evaluar el action que se recibe, entra a distintos case del switch
//y realiza la mutacion correspondiente del estado
const authReducer = (state:AuthState, action:AuthAction): AuthState => {
  switch (action.type) {
    case 'logout':
      return {
        validando: false,
        token: null,
        nombre: '',
        username: ''
      }
    case 'login':
      return {
        validando: false,
        token:'ABC123',
        nombre: action.payload.nombre,
        username: action.payload.username
      }
  
    default:
      return state
  }
}

export const Login = () => {

  //reducer -> funcion para retornar un nuevo estado
  //initialState -> estado inicial
  //state -> regresa el estado
  //dispatch -> funcion para disparar acciones
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    setTimeout(() => {
      dispatch({type:'logout'})
    },1500)
  }, [])

  const login = () => {
    dispatch({type:'login',payload:{nombre:'alan',username:'alanrjn'}})
  }

  const logout = () => {
    dispatch({type:'logout'})
  }

  if (state.validando) {
    return (
      <>
        <h3>Login</h3>
        <div className="alert alert-info">validando...</div>
      </>
    )
  }
  

  return (
    <>
    <h3>Login</h3>
      {
        (state.token)
          ?<div className="alert alert-success"> {state.username} autenticado correctamente</div>
          :<div className="alert alert-danger">no autenticado</div>
      }
      {
        (!state.token)
        ? <button
              className="btn btn-primary"
              onClick={login}>
            Login
          </button>
      :
          <button
              className="btn btn-secondary"
              onClick={logout}>
            Logout
          </button>
      }

    </>
  )
}
