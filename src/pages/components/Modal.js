import React from 'react'
import { Modal } from 'antd';

const ModalDA = ({ title, children, visible, footer, onClickCancelar, closable = true, width }) => {
  return (
    <Modal
      visible={visible}
      title={title && <h3 className='m-0'>{title}</h3>}
      footer={footer && footer}
      onCancel={onClickCancelar}
      closable={closable}
      width={width && width}
      destroyOnClose>
      {children}
    </Modal>
  )
}

export default ModalDA
