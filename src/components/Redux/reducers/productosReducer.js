// ACTION TYPES

import {OBTENER_PRODUCTOS, CREAR_PRODUCTO, SELECTED_PRODUCT, EDITAR_PRODUCTO, OBTENER_TOTAL_PRODUCTOS, OBTENER_REPORTE_PRODUCTOS, OBTENER_LISTADO_STOCK, OBTENER_PRODUCTOS_VENTA, OBTENER_REPORTE_STOCK, CLEAR_PRODUCTOS, OBTENER_TOTAL_INVERTIDO} from "../actionTypes";


// INITIAL STATE
const initialState = {
    productos: [],
    productosFilter: [],
    productosNoDisponibles: [],
    productosNoDisponiblesFilter: [],
    productosVenta: null,
    listadoStock: null,
    loading: true,
    errorResponse: false,
    selectedProduct: {},
    totalProductos: null,
    totalInvertido: null,
    reporteProductos: null,
    reporteStock: null
};

// REDUCER FUNCTION
const productosReducer = (state = initialState, action) => {
    switch(action.type){
        case OBTENER_TOTAL_PRODUCTOS:
            return {
                ...state,
                totalProductos: action.totalProductos
            }
        case OBTENER_PRODUCTOS:
            return {
                ...state,
                productos: action.productos,
                productosNoDisponibles: action.productosNoDisponibles,
                errorResponse: false
            }
        case OBTENER_PRODUCTOS_VENTA:
            return {
                ...state,
                productosVenta: action.productosVenta
            }
        case OBTENER_LISTADO_STOCK:
            return {
                ...state,
                listadoStock: action.listado
            }
        case CREAR_PRODUCTO:
            return {
                ...state,
                productos: action.productos,
                productosNoDisponibles: action.productosNoDisponibles,
                errorResponse: false
            }
        case SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.producto
            }
        case EDITAR_PRODUCTO:
            return {
                ...state,
                productos: action.productos,
                productosNoDisponibles: action.productosNoDisponibles,
                errorResponse: false
            }
        case OBTENER_REPORTE_PRODUCTOS:
            return {
                ...state,
                reporteProductos: action.productos
            }
        case OBTENER_TOTAL_INVERTIDO:
            return {
                totalInvertido: action.totalInvertido
            }
        case OBTENER_REPORTE_STOCK:
            return {
                ...state,
                reporteStock: action.productos
            }
        case CLEAR_PRODUCTOS:
            return initialState;
        default:
            return state;
    }
}

export default productosReducer;