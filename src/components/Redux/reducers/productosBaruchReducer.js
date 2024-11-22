// ACTION TYPES

import {
    OBTENER_TOTAL_PRODUCTOS_BARUCH,OBTENER_PRODUCTOS_BARUCH_VENTA,OBTENER_PRODUCTOS_BARUCH,OBTENER_LISTADO_STOCK_BARUCH,CREAR_PRODUCTO_BARUCH,
    SELECTED_PRODUCT_BARUCH,EDITAR_PRODUCTO_BARUCH,OBTENER_REPORTE_PRODUCTOS_BARUCH,OBTENER_TOTAL_INVERTIDO_BARUCH,OBTENER_REPORTE_STOCK_BARUCH,CLEAR_PRODUCTOS
} from "../actionTypes";


// INITIAL STATE
const initialState = {
    productosBaruch: [],
    productosBaruchNoDisponibles: [],
    productosVentaBaruch: null,
    listadoStockBaruch: null,
    loadingBaruch: true,
    errorResponseBaruch: false,
    selectedProductBaruch: {},
    totalProductosBaruch: null,
    totalInvertidoBaruch: null,
    reporteProductosBaruch: null,
    reporteStockBaruch: null
};

// REDUCER FUNCTION
const productosBaruchReducer = (state = initialState, action) => {
    switch(action.type){
        case OBTENER_TOTAL_PRODUCTOS_BARUCH:
            return {
                ...state,
                totalProductosBaruch: action.totalProductos
            }
        case OBTENER_PRODUCTOS_BARUCH:
            return {
                ...state,
                productosBaruch: action.productos,
                productosBaruchNoDisponibles: action.productosNoDisponibles,
                errorResponse: false
            }
        case OBTENER_PRODUCTOS_BARUCH_VENTA:
            return {
                ...state,
                productosVentaBaruch: action.productosVenta
            }
        case OBTENER_LISTADO_STOCK_BARUCH:
            return {
                ...state,
                listadoStockBaruch: action.listado
            }
        case CREAR_PRODUCTO_BARUCH:
            return {
                ...state,
                productosBaruch: action.productos,
                productosBaruchNoDisponibles: action.productosNoDisponibles,
                errorResponse: false
            }
        case SELECTED_PRODUCT_BARUCH:
            return {
                ...state,
                selectedProductBaruch: action.producto
            }
        case EDITAR_PRODUCTO_BARUCH:
            return {
                ...state,
                productosBaruch: action.productos,
                productosBaruchNoDisponibles: action.productosNoDisponibles,
                errorResponseBaruch: false
            }
        case OBTENER_REPORTE_PRODUCTOS_BARUCH:
            return {
                ...state,
                reporteProductosBaruch: action.productos
            }
        case OBTENER_TOTAL_INVERTIDO_BARUCH:
            return {
                totalInvertidoBaruch: action.totalInvertido
            }
        case OBTENER_REPORTE_STOCK_BARUCH:
            return {
                ...state,
                reporteStockBaruch: action.productos
            }
        case CLEAR_PRODUCTOS:
            return initialState;
        default:
            return state;
    }
}

export default productosBaruchReducer;