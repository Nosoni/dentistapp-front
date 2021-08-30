import React from 'react'
import { Button, Modal } from 'antd';

const ModalDA = ({ title, children, visible, footer, onClickCancelar }) => {
  return (
    <Modal
      visible={visible}
      destroyOnClose
      title={<h3 className='m-0'>{title}</h3>}
      onCancel={onClickCancelar}
      footer={footer}>
      {children}
    </Modal>
  )
}

export default ModalDA
