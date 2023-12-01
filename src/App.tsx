import { Contador } from "./components/Contador";
import { ContadorConHook } from "./components/ContadorConHook";
import { Formularios } from "./components/Formularios";
import { Login } from "./components/Login";
import { Usuarios } from "./components/Usuarios";
import { Funciones } from "./typescript/Funciones";
import { ObjetosLiterales } from "./typescript/ObjetosLiterales";
import { TiposBasicos } from "./typescript/TiposBasicos";

const App = () => {
  return (
    <div className='mt-2'>
      <h1>React con Typescript</h1>
      <hr />
      {/* <TiposBasicos></TiposBasicos> */}
      {/* <ObjetosLiterales></ObjetosLiterales> */}
      {/* <Funciones></Funciones> */}
      {/* <Contador></Contador> */}
      {/* <ContadorConHook></ContadorConHook> */}
      {/* <Login></Login> */}
      {/* <Usuarios></Usuarios> */}
      <Formularios></Formularios>
    </div>
  )
}

export default App;