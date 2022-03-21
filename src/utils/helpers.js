let moment = require('moment');

const validarFecha = (fecha) => {
  return fecha ? moment.utc(fecha) : fecha
}

const objectHasValue = (obj) => {
  return Object.values(obj).some(prop => prop !== undefined)
}

export { validarFecha, objectHasValue };