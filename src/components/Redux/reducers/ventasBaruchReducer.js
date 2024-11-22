// ACTION TYPES

import {
    AGREGAR_PRODUCTO_CARRITO_BARUCH, 
    CAMBIO_TOTAL_VENTA_BARUCH, 
    AGREGAR_PRODUCTO_CANTIDAD_BARUCH, 
    RESTAR_PRODUCTO_CANTIDAD_BARUCH, 
    ELIMINAR_PRODUCTO_CARRITO_BARUCH, 
    OBTENER_VENTAS_BARUCH, 
    VENTA_REALIZADA_BARUCH, 
    SELECCIONAR_VENTA_BARUCH, 
    OBTENER_VENTAS_CANCELADAS_BARUCH, 
    SELECCIONAR_VENTA_CANCELADA_BARUCH,
    OBTENER_REPORTE_VENTAS_BARUCH,
    ELIMINAR_REPORTE_VENTAS_BARUCH,
    OBTENER_VENTAS_HOY_BARUCH,
    OBTENER_VENTAS_USUARIOS_BARUCH,
    OBTENER_LISTADO_VENTAS_HOY_BARUCH,
    OBTENER_REPORTE_VENTAS_CATEGORIA_BARUCH,
    OBTENER_VENTAS_GANANCIAS_BARUCH,
    CLEAR_VENTAS,
    AGREGAR_PRODUCTOS_CARRITO_BARUCH,
    OBTENER_VENTAS_ENCABEZADO_HOY_BARUCH,
    REPORTE_VENTA_PRODUCTOS_BARUCH
} from "../actionTypes";


// INITIAL STATE
const initialState = {
    productosSeleccionadosBaruch: null,
    ventaSeleccionadaBaruch: null,
    ventaCanceladaSeleccionadaBaruch: null,
    tipoVentaBaruch: null,
    ventasBaruch: null,
    ventasHoyBaruch: null,
    encabezadosHoyBaruch: null,
    ventasCanceladasBaruch: null,
    totalBaruch: 0,
    errorResponse: false,
    informacionVentaBaruch: null,
    reciboBaruch: null,
    productosVendidosBaruch: null,
    reporteVentasBaruch: null,
    reporteVentasUsuariosBaruch: null,
    reporteVentasCategoriaBaruch: null,
    reporteGananciasBaruch: null,
    reporteVentasProductoBaruch: null
};

// REDUCER FUNCTION
const ventasBaruchReducer = (state = initialState, action) => {
    switch(action.type){
        case SELECCIONAR_VENTA_BARUCH:
            return {
                ...state,
                ventaSeleccionadaBaruch: action.venta
            }
        case SELECCIONAR_VENTA_CANCELADA_BARUCH:
            return {
                ...state,
                ventaCanceladaSeleccionadaBaruch: action.venta
            }
        case OBTENER_VENTAS_BARUCH:
            return {
                ...state,
                ventasBaruch: action.ventas
            }
        case OBTENER_LISTADO_VENTAS_HOY_BARUCH:
        return {
            ...state,
            ventasBaruch: action.ventas
        }
        case OBTENER_VENTAS_HOY_BARUCH:
            return {
                ...state,
                ventasBaruch: action.ventas
            }
        case OBTENER_VENTAS_ENCABEZADO_HOY_BARUCH:
            return {
                ...state,
                encabezadosHoyBaruch: action.ventas
            }
        case OBTENER_VENTAS_GANANCIAS_BARUCH:
            return {
                ...state,
                reporteGananciasBaruch: action.ventas
            }
        case OBTENER_VENTAS_USUARIOS_BARUCH:
            return {
                ...state,
                reporteVentasUsuariosBaruch: action.ventas
            }
        case OBTENER_REPORTE_VENTAS_BARUCH:
            return {
                ...state,
                reporteVentasBaruch: action.ventas
            }
        case OBTENER_REPORTE_VENTAS_CATEGORIA_BARUCH:
            return {
                ...state,
                reporteVentasCategoriaBaruch: action.ventas
            }
        case OBTENER_VENTAS_CANCELADAS_BARUCH:
            return {
                ...state,
                ventasCanceladasBaruch: action.ventas
            }
        case AGREGAR_PRODUCTO_CARRITO_BARUCH:
            return {
                ...state,
                productosSeleccionadosBaruch: state.productosSeleccionadosBaruch === null ? [action.producto] : [action.producto, ...state.productosSeleccionadosBaruch],
                totalBaruch: state.totalBaruch + action.total
            }
        case AGREGAR_PRODUCTOS_CARRITO_BARUCH:
            return {
                ...state,
                productosSeleccionadosBaruch: action.productos,
                totalBaruch: action.total
            }
        case AGREGAR_PRODUCTO_CANTIDAD_BARUCH:
            return {
                ...state,
                carritoBaruch: action.carrito,
            }
        case CAMBIO_TOTAL_VENTA_BARUCH:
            return {
                ...state,
                totalBaruch: action.total
            }
        case RESTAR_PRODUCTO_CANTIDAD_BARUCH:
            return {
                ...state,
                carritoBaruch: action.carrito,
                totalBaruch: action.total
            }
        case ELIMINAR_PRODUCTO_CARRITO_BARUCH:
            return {
                ...state,
                productosSeleccionadosBaruch: null,
                totalBaruch: 0,
                informacionVentaBaruch: null
            }
        case ELIMINAR_REPORTE_VENTAS_BARUCH:
            return {
                ...state,
                reporteVentasBaruch: null
            }
        case VENTA_REALIZADA_BARUCH:
            return {
                ...state,
                productosSeleccionadosBaruch: null,
                totalBaruch: 0,
                tipoVentaBaruch: null,
                informacionVentaBaruch: null,
                reciboBaruch: action.recibo,
                productosVendidosBaruch: action.productosVendidos
            }
        case REPORTE_VENTA_PRODUCTOS_BARUCH:
            return {
                ...state,
                reporteVentasProductoBaruch: action.ventas
            }
        case "ELIMINAR_RECIBO":
            return {
                ...state,
                reciboBaruch: null
            }
        case CLEAR_VENTAS: 
            return initialState;
        default:
            return state;
    }
}
export default ventasBaruchReducer;