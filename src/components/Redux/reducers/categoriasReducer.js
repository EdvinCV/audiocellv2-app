// ACTION TYPES

import {OBTENER_CATEGORIAS} from "../actionTypes";


// INITIAL STATE
const initialState = {
    categorias: [],
    loading: true,
    errorResponse: false
};

// REDUCER FUNCTION
const categoriasReducer = (state = initialState, action) => {
    switch(action.type){
        case OBTENER_CATEGORIAS:
            return {
                ...state,
                categorias: action.categorias,
                errorResponse: false
            }
        default:
            return state;
    }
}

export default categoriasReducer;