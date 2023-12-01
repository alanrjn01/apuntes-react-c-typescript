import { useState } from "react"
import { useForm } from "../hooks/useForm"


export const Formularios = () => {

  type formData = {
    email:string,
    password:string
  }

  const initialState:formData = {
    email:'',
    password:''
  }

  const {state, onChange} = useForm(initialState)

  return (
    <>
    <h3>Formularios</h3>
    <input type="text"
      className="form-control"
      placeholder="email"
      value={state.email}
      onChange={({target}) => onChange(target.value, 'email')}/
    >
    <input type="text"
        className="form-control mt-2 mb-02"
        placeholder="password" value={state.password}
       onChange={({target}) => onChange(target.value,'password')}/>

      <code>
        <pre>{JSON.stringify(state,null,2)}</pre>
      </code>

    </>
  )
}
