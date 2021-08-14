//rfce
import React from 'react'
import { Button, Card, Form, Input } from 'antd';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

function Usuario() {
  //useEffect(() => { !localStorage.getItem("usuario") && props.history.push("/login") }, [])
  const schema = yup.object({
    email: yup.string().required("Favor ingrese el correo")
  })

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = data => console.log(data);
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder='Email' {...register("email")} />
      <input type="submit" />
    </form>
  )
}

export default Usuario;
