// ACTION TYPES

import {OBTENER_CATEGORIAS_BARUCH} from "../actionTypes";


// INITIAL STATE
const initialState = {
    categoriasBaruch: [],
    loading: true,
    errorResponse: false
};

// REDUCER FUNCTION
const categoriasBaruchReducer = (state = initialState, action) => {
    switch(action.type){
        case OBTENER_CATEGORIAS_BARUCH:
            return {
                ...state,
                categoriasBaruch: action.categorias,
                errorResponse: false
            }
        default:
            return state;
    }
}

export default categoriasBaruchReducer;