import React from 'react'
import { Input } from 'antd';
import ButtonsTooltips from './ButtonsTooltips';
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';

const BuscadorAcciones = (props) => {
  return (
    <div className='elem-list'>
      <Input placeholder={props.placeholder ? props.placeholder : "Introduzca un valor de búsqueda"}
        {...props.registro}
        style={{ borderRadius: '10px' }} />
      <ButtonsTooltips
        onClick={props.buscar}
        className="bg-color-info"
        tooltipsTitle="Buscar"
        shape='circle'
        icon={<SearchOutlined />} />
      <ButtonsTooltips
        onClick={props.nuevo}
        className='bg-color-success'
        tooltipsTitle="Nuevo"
        shape='circle'
        icon={<PlusOutlined />} />
    </div>
  )
}

export default BuscadorAcciones
