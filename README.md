# 1 - Diferencias entre interfaces y clases
Las interfaces sirven únicamente para poner reglas de validación a objetos, no funcionan como clases ya que no se pueden crear instancias.  
```
interface Persona {
  nombreCompleto: string
  edad: number
  direccion: Direccion
}

interface Direccion {
  pais: string,
  casaNo: number
}
```

Esto me permite, a través de la interfaz Persona, crear un objeto literal que cumpla con los datos declarados en la interfaz.
```
const persona: Persona = {
    nombreCompleto: "alan",
    edad: 35,
    direccion: {
      pais: 'Canada',
      casaNo:614
    }
  }
```

# 2 - Apunte Custom hooks
Un custom hook es una función que maneja un valor y una funcion que modifica ese valor. Por ejemplo el hook useCounter, crea un valor inicial y una funcion que se encarga de acumular en ese valor inicial cambiando asi el valor de la variable inicial.  

Ahora el hook, lo podemos importar en cualquier parte de nuestra aplicación y poder utilizar esa lógica utilizando desestructuracion de la variable (valor) y del metodo (acumular) 

```
  const {valor,acumular} = useCounter();
```

# 3 - UseReducer
useReducer es muy similar a useState, pero te permite mover la lógica de actualización de estado de los controladores de eventos a una única función fuera de tu componente.

Esta teoría va a servir para aprender librerías como redux toolkit ya que se maneja de forma similar, pero manejando el estado globalmente.
- reducer -> funcion para retornar un nuevo estado
- initialState -> estado inicial
- state -> regresa el estado
- dispatch -> funcion para disparar acciones

```
const [state, dispatch] = useReducer(authReducer, initialState)
```

1 - Primero creo un estado inicial * initialState * que es interfaceado por * AuthState*

```
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
```

2 - Después creo una acción para el reducer. La acción me va a indicar como es que debo tratar la modificación del estado, en este caso, a través de un 'logout' y un 'login'

```
type AuthAction = 
  | {type: 'logout'}
  | {type: 'login', payload: LoginPayload}
```

3 - Creo el reducer, pasándole como parámetro el estado, y la acción que modificará el estado, en el cuerpo del reducer, a través de un switch, declaro los distintos tipos de acción y su cambio de estado correspondiente.

```
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
```

4 - Por último, puedo llamar a mi estado a través de la variable 'state' y cambiar su valor a través de las distintas acciones usando el dispatch
```
  const login = () => {
    dispatch({type:'login',payload:{nombre:'alan',username:'alanrjn'}})
  }

  const logout = () => {
    dispatch({type:'logout'})
  }

```

```
<div className="alert alert-success"> {state.username} autenticado correctamente</div>
```

# 4 - Axios
Para hacer peticiones GET con Axios, creo una interfaz 'ReqRes.tsx' donde voy a guardar la/s intefaces para la respuesta que genera la petición probada previamente ya en postman.  
Usando quicktype podemos pasar un objeto JSON a interfaz de typescript.

```
export interface ReqResListado {
  page:        number;
  per_page:    number;
  total:       number;
  total_pages: number;
  data:        Usuario[];
  support:     Support;
}
```

Después en la llamada GET a la api, declaramos que el retorno de ese get va a ser de tipo ReqResListado.

```
const res = await reqResApi.get<ReqResListado>('/users',
        {params: {page:paginaRef.current}}
      )
```

# 5 - Formularios con useState
Para crear formularios, podemos crear un estado del formulario y un SetFormulario para modificarlo. En el useState declaramos los campos del formulario.  
En la funcion onChange vamos a manejar dinámicamente el cambio de los valores del formulario, haciendo que en input le indiquemos que campo queremos cambiar
```
  const [formulario, setFormulario] = useState({
    email:'test@test.com',
    password:'123456'
  })

  const onChange = (value:string, campo:string) => {
    setFormulario({
      ...formulario,
      [campo]: value
    })
  }

  //input: 

      <input type="text"
      className="form-control"
      placeholder="email"
      value={formulario.email}
      onChange={({target}) => onChange(target.value, 'email')}/
    >

```

# 6 - Hook de formulario y uso de genéricos
El tipo genérico significa que dependiendo de su argumento se va a establecer el tipo.

```
export const useForm = <T extends Object>(formulario: T) => {

  const [state, setState] = useState(formulario)

  const onChange = (value:string, campo:keyof T) => {
    setState({
      ...state,
      [campo]: value
    })
  }

  return {
    state,
    onChange
  }
}
```

En este caso, el tipo de la funcion es un tipo genérico * T * que extiende de * Object *, por lo que el tipo que dato que devuelve puede ser cualquiera que se pase al momento de llamar a la función de useForm. También, como parámetro se le pasa el formulario de tipo genérico.  

En la función onChange, capturamos el valor que se ingresa por el input y el campo.  
keyof T comprueba que el campo pasado por parámetro corresponda al tipo del formulario que se paso al momento de llamar a useForm