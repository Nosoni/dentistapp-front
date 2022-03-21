import React from 'react'
import { Transfer } from 'antd';

const ListaTransferir = ({ title, dataSource, listado, handleChange }) => {

  const filtrarOpcion = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  return <div>
    <label className="ant-form-item-label">{title}</label>
    <Transfer
      dataSource={dataSource}
      showSearch
      filterOption={filtrarOpcion}
      targetKeys={listado}
      onChange={handleChange}
      render={item => item.title}
      locale={{
        notFoundContent: 'Sin registros',
        searchPlaceholder: 'Buscar'
      }}
      listStyle={{
        width: '46%',
        height: 300,
      }}
      titles={['Para asignar', 'Asignados']}
    />
  </div>
}

export default ListaTransferir
