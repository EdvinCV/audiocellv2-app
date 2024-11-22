import { reducer as reduxFormReducer } from 'redux-form'; 
import productosReducer from './productosReducer';
import categoriasReducer from './categoriasReducer';
import ventasReducer from './ventasReducer';
import cajaReducer from './cajaReducer';
import usersReducer from './usersReducer';
import productosBaruchReducer from './productosBaruchReducer';
import categoriasBaruchReducer from './categoriasBaruchReducer';
import cajaBaruchReducer from './cajaBaruchReducer';
import ventasBaruchReducer from './ventasBaruchReducer';
const { combineReducers } = require("redux");
const { default: authenticationReducer } = require("./authenticationReducer");

const reducer = combineReducers({
    authentication: authenticationReducer,
    usuarios: usersReducer,
    productos: productosReducer,
    productosBaruch: productosBaruchReducer,
    categorias: categoriasReducer,
    categoriasBaruch: categoriasBaruchReducer,
    ventas: ventasReducer,
    ventasBaruch: ventasBaruchReducer,
    caja: cajaReducer,
    cajaBaruch: cajaBaruchReducer,
    form: reduxFormReducer
});

export default reducer;