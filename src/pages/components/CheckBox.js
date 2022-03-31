import React from 'react'
import { useController } from 'react-hook-form'
import { Checkbox } from 'antd'

const CheckBox = ({ name, control, label }) => {
  const { field } = useController({ name, control })

  return <Checkbox
    {...field}
    checked={field.value}
    onChange={e => {
      field.onChange(e.target.checked)
    }}
  >
    {label}
  </Checkbox>
}

export default CheckBox