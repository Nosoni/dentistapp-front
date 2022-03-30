import React, { useEffect, useState } from 'react'
import { useController } from 'react-hook-form'
import { Select } from 'antd'

const lengthOfTextSearch = 3

const LiveSearch = ({ control, name, onChange, label, opciones, busqueda, multi = false, placeholder = '' }) => {
  const { field } = useController({ control, name })
  const [newOptiones, setOptiones] = useState(opciones)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setOptiones([...opciones])
  }, [opciones])

  return <>
    <label className="ant-form-item-label">
      {label}
    </label>
    <Select
      isMulti={multi}
      placeholder={placeholder}
      options={newOptiones}
      loading={loading}
      searchValue={() => 'Buscando...'}
      noOptionsMessage={() => 'Sin opciones'}
      onInputKeyDown={(value) => {
        if (value.key === 'Enter' && !!value && value.length >= lengthOfTextSearch) {
          busqueda(value, setLoading)
        }
      }}
      {...field}
      onChange={(value) => {
        onChange(value)
        field.onChange(value)
      }}
    // allowClear={allowClear}
    // showSearch={showSearch}
    // showArrow={showArrow}
    // labelInValue={labelInValue}
    // defaultActiveFirstOption
    // mode='multiple'
    />
  </>
}

export default LiveSearch