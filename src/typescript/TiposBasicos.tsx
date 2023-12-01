
export const TiposBasicos = () => {

  //tipado
  let nombre: string= "Alan"
  let edad: number = 35
  let estaActivo: boolean = true
  const poderes: string[] = []
  let variables: (string|number)[] = []
  variables.push("a")
  variables.push(2)

  return (
    <>
      <h3>Tipos básicos</h3>
      {nombre.toUpperCase()}
    </>
  )
}
