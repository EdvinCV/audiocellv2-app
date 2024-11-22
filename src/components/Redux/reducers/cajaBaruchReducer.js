// ACTION TYPES

import {ABRIR_CAJA_BARUCH, CLEAR_CAJAS, OBTENER_CAJA_BARUCH, OBTENER_CAJAS_GENERAL_BARUCH} from "../actionTypes";


// INITIAL STATE
const initialState = {
    cajaActualBaruch: null,
    cajasGeneralBaruch: null,
    cajaAbiertaBaruch: null,
    loading: false,
    errorResponse: false
};

// REDUCER FUNCTION
const cajaBaruchReducer = (state = initialState, action) => {
    switch(action.type){
        case OBTENER_CAJA_BARUCH:
            return {
                ...state,
                cajaActualBaruch: action.cajaActual,
                cajaAbiertaBaruch: action.cajaAbierta
            }
        case OBTENER_CAJAS_GENERAL_BARUCH:
            return {
                ...state,
                cajasGeneralBaruch: action.cajas
            }
        case ABRIR_CAJA_BARUCH:
            return {
                ...state,
                cajaActualBaruch: action.cajaActual,
                cajaAbiertaBaruch: action.cajaAbierta
            }
        case CLEAR_CAJAS: {
            return initialState;
        }
        default:
            return state;
    }
}
export default cajaBaruchReducer;