import React from 'react'
import { Input } from 'antd';
import ButtonsTooltips from './ButtonsTooltips';
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';

const BuscadorAcciones = (props) => {
  return (
    <div className='row'>
      <Input placeholder={props.placeholder ? props.placeholder : "Introduzca un valor de búsqueda"}
        {...props.registro}
        style={{ borderRadius: '10px' }} 
        className="mr-2"/>
      {props.children}
      <ButtonsTooltips
        onClick={props.buscar}
        className="bg-color-info mr-2"
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
