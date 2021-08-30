import React from 'react'
import { Input, Form, Button, Select } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const UsuarioEditar = ({ usuario }) => {
  const schema = yup.object({
    usuario: yup.string().required("Favor introduzca el Usuario")
  })
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: usuario,
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log("data", data);

  return (
    <div>
      <form className="ant-form ant-form-horizontal">
        <Controller
          name="usuario"
          control={control}
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Usuario: </label>
            <Input
              {...field}
              disabled
            />
          </div>
          }
        />
        <Controller
          name="funcionario_id"
          control={control}
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Funcionario: </label>
            <Select
              {...field}
              options={[
                { value: 1, label: "Chocolate" },
                { value: 2, label: "Vanilla" },
                { value: 3, label: "Strawberry" }
              ]}
            />
          </div>
          }
        />
        <Button onClick={handleSubmit(onSubmit)} className='bg-color-info' icon={<PlusOutlined />} />
      </form>
    </div>
  )
}

export default UsuarioEditar
