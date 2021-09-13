import React from 'react'
import { Button, Tooltip } from 'antd';

const ButtonsTooltips = ({ tooltipsTitle, children, ...rest }) => {
  return (
    <Tooltip title={tooltipsTitle}>
      <Button {...rest}>
        {children}
      </Button>
    </Tooltip>
  )
}

export default ButtonsTooltips
