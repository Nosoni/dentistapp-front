import { Button } from 'antd'
import React from 'react'

const BotoneraFooterActions = ({ onClickCancelar, onClickAceptar, esEliminar }) => {
  return (
    <div className='modal-footer d-flex justify-content-between'>
      <Button className='bg-color-info' onClick={onClickCancelar}>
        Volver
      </Button>
      <Button className={'bg-color-' + (esEliminar ? 'error' : 'success')} onClick={onClickAceptar}>
        Aceptar
      </Button>
    </div>
  )
}

export default BotoneraFooterActions
