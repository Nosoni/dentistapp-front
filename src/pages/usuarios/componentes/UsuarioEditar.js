import React from 'react'
import { Input, Form, Button } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const UsuarioEditar = ({ usuario }) => {

  const schema = yup.object({
    usuario: yup.string().required("Favor introduzca el Usuario")
  })
  const { Item } = Form;

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: usuario, resolver: yupResolver(schema) });
  const onSubmit = data => console.log(data);

  console.log(errors?.usuario)
  return (
    <div>
      <form className="ant-form ant-form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="usuario"
          control={control}
          render={({ field }) => <div className='ant-row ant-form-item'>
            <label className="ant-form-item-label">Usuario: </label>
            <Input
              {...field}
              className={"ant-form-item-control-input" + (!!errors?.usuario?.message && "has-error")}
            />
          </div>}
        />
      </form>
      {/* 
      <Form layout='horizontal' onSubmit={handleSubmit(onSubmit)}>
        <Item
          label='Usuario'
        >
          <Controller
            name="usuario"
            control={control}
            render={({ field }) =>
              <Input
                {...field}
                className={!!errors?.usuario?.message && "has-error"}
              />
            }
          />
        </Item>
      </Form> */}
    </div>
  )
}

export default UsuarioEditar
