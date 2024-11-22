// ACTION TYPES

import { CLEAR_AUTENTICACION, LOGIN_ERROR, LOGIN_EXITOSO, LOGOUT } from "../actionTypes";


// INITIAL STATE
const initialState = {
    access_token: localStorage.getItem("access_token"),
    authenticated: localStorage.getItem("access_token") ? true : false,
    errorResponse: false,
    user: null
};

// REDUCER FUNCTION
const authenticationReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_EXITOSO:
            localStorage.setItem("access_token", action.token);
            localStorage.setItem("id", action.user.id);
            return {
                ...state,
                access_token: action.token,
                authenticated: true,
                errorResponse: false,
                user: action.user
            }
        case LOGIN_ERROR:
            return {
                ...state,
                authenticated: false,
                errorResponse: true
            }
        case LOGOUT:
            localStorage.removeItem("access_token");
            localStorage.removeItem("id");
            localStorage.removeItem("s");
            return {
                ...state,
                access_token: null,
                authenticated: false,
                errorResponse: false
            }
        case CLEAR_AUTENTICACION: {
            return initialState;
        }
        default:
            return state;
    }
}

export default authenticationReducer;