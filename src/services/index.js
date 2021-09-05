const axios = require("axios")

const peticion = async (configuracion) => {
  try {
    const respuesta = await axios(configuracion)
    console.log("c", respuesta.data.datos)
    return {
      error: false,
      mensaje: respuesta.data.mensaje,
      datos: respuesta.data.datos,
    }
  } catch (error) {
    return {
      error: true,
      mensaje: error.response.data.mensaje
    }
  }
}
export { peticion }
