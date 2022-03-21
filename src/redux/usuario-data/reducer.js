import { SET_DATOS_USUARIO, UPDATE_DATOS_USUARIO } from "./actions";

const initialState = {};

export const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATOS_USUARIO:
      return { ...action.payload };
    case UPDATE_DATOS_USUARIO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
