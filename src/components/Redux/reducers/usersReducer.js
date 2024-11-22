// ACTION TYPES

import {OBTENER_USUARIOS, CREAR_USUARIO, SELECCIONAR_USUARIO, GET_ME, ELIMINAR_USUARIO, CLEAR_USUARIOS, OBTENER_TIENDAS, SELECT_TIENDA} from "../actionTypes";


// INITIAL STATE
const initialState = {
    usuarios: null,
    loading: false,
    errorResponse: false,
    selectedUser: null,
    me: null,
    tiendas: null,
    selectedTienda: 0
};

// REDUCER FUNCTION
const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ME:
            return {
                ...state,
                me: action.me
            }
        case OBTENER_USUARIOS:
            return {
                ...state,
                usuarios: action.usuarios
            }
        case CREAR_USUARIO:
            return {
                ...state,
                usuarios: action.usuarios
            }
        case SELECCIONAR_USUARIO:
            return {
                ...state,
                selectedUser: action.usuario
            }
        case ELIMINAR_USUARIO:
            return {
                ...state,
                usuarios: action.usuarios
            }
        case OBTENER_TIENDAS:
            return {
                ...state,
                tiendas: action.tiendas
            }
        case SELECT_TIENDA:
            return {
                ...state,
                selectedTienda: action.tienda
            }
        case CLEAR_USUARIOS:
            return initialState;
        default:
            return state;
    }
}
export default usersReducer;