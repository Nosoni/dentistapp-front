import React from 'react'
import ButtonsTooltips from './ButtonsTooltips'

const BotoneraTableAcciones = ({ onClickEditar, onClickEliminar }) => {
  return (
    <div className='buttons-list nowrap'>
      <ButtonsTooltips
        onClick={onClickEditar}
        shape='circle'
        className="bg-color-info"
        tooltipsTitle="Editar">
        <span className='icofont icofont-edit-alt' />
      </ButtonsTooltips>
      <ButtonsTooltips
        onClick={onClickEliminar}
        shape='circle'
        className="bg-color-error"
        tooltipsTitle="Eliminar">
        <span className='icofont icofont-ui-delete' />
      </ButtonsTooltips>
    </div>
  )
}

export default BotoneraTableAcciones
