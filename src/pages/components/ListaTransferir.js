import React from 'react'
import { Transfer } from 'antd';

const ListaTransferir = ({ dataSource, listado, handleChange }) => {

  //tener cuidado con option
  const filtrarOpcion = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  return (
    dataSource.length > 0 &&
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
        width: 550,
        height: 300,
      }}
      titles={['Para asignar', 'Asignados']}
    />
  )
}

export default ListaTransferir
