export const SET_DATOS_USUARIO = "set_datos_usuario";
export const UPDATE_DATOS_USUARIO = "update_datos_usuario";

export const setUsuarioData = (payload) => ({
  type: SET_DATOS_USUARIO,
  payload
});

export const updateUsuarioData = (payload) => ({
  type: UPDATE_DATOS_USUARIO,
  payload
});