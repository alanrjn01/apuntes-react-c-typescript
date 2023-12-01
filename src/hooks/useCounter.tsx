import { useState } from "react"

export const useCounter = (valorInicial:number = 10) => {
  const [valor, setvalor] = useState(valorInicial)

  const acumular = (numero:number) => {
    setvalor(valor + numero)
  }  

  return {
    valor: valor,
    acumular: acumular
  }

}
