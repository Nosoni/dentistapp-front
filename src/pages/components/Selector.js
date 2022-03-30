import React from 'react'
import { useController } from 'react-hook-form'
import { Select } from 'antd'

const Selector = ({ name, control, label, opciones, placeholder = '', notFoundContent = '' }) => {
  const { field } = useController({ name, control })

  return <>
    <label className="ant-form-item-label">
      {label}
    </label>
    <Select
      options={opciones}
      placeholder={placeholder}
      notFoundContent={notFoundContent}
      {...field}
    />
  </>
}

export default Selector