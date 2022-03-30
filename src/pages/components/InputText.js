import React from 'react'
import { useController } from 'react-hook-form'
import { Input } from 'antd'

const InputText = ({ name, control, label, ...rest }) => {
  const { field } = useController({ name, control })

  return <>
    <label className="ant-form-item-label">
      {label}
    </label>
    <Input
      {...field}
      {...rest}
    />
  </>
}

export default InputText