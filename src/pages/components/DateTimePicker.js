import React from 'react'
import { DatePicker } from 'antd';
import "./css/datetimepicker.css"

const DateTimePicker = (props) => {
  return (
    <DatePicker
      placeholder="Seleccione la fecha"
      format="DD/MM/YYYY"
      {...props}
    />
  )
}

export default DateTimePicker
