import React from 'react'
import { Button } from 'antd'

const BotoneraFooterActions = ({ onClickCancelar, onClickAceptar, esEliminar, aceptarEnable = false }) => {
  return (
    <div className='modal-footer d-flex justify-content-between mt-4'>
      <Button
        className='bg-color-info'
        onClick={onClickCancelar}>
        Volver
      </Button>
      <Button
        className={'bg-color-' + (esEliminar ? 'error' : 'success')}
        onClick={onClickAceptar}
        disabled={aceptarEnable}
      >
        Aceptar
      </Button>
    </div>
  )
}

export default BotoneraFooterActions;
