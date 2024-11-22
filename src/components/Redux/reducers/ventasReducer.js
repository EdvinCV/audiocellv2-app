// ACTION TYPES

import {
    AGREGAR_PRODUCTO_CARRITO, 
    CAMBIO_TOTAL_VENTA, 
    AGREGAR_PRODUCTO_CANTIDAD, 
    RESTAR_PRODUCTO_CANTIDAD, 
    ELIMINAR_PRODUCTO_CARRITO, 
    OBTENER_VENTAS, 
    VENTA_REALIZADA, 
    SELECCIONAR_VENTA, 
    OBTENER_VENTAS_CANCELADAS, 
    SELECCIONAR_VENTA_CANCELADA,
    OBTENER_REPORTE_VENTAS,
    ELIMINAR_REPORTE_VENTAS,
    OBTENER_VENTAS_HOY,
    OBTENER_VENTAS_USUARIOS,
    OBTENER_LISTADO_VENTAS_HOY,
    OBTENER_REPORTE_VENTAS_CATEGORIA,
    OBTENER_VENTAS_GANANCIAS,
    CLEAR_VENTAS,
    AGREGAR_PRODUCTOS_CARRITO,
    OBTENER_VENTAS_ENCABEZADO_HOY,
    REPORTE_VENTA_PRODUCTOS,
    CLEAR_LISTADOS_VENTAS
} from "../actionTypes";


// INITIAL STATE
const initialState = {
    productosSeleccionados: null,
    ventaSeleccionada: null,
    ventaCanceladaSeleccionada: null,
    tipoVenta: null,
    ventas: null,
    ventasHoy: null,
    encabezadosHoy: null,
    ventasCanceladas: null,
    total: 0,
    errorResponse: false,
    informacionVenta: null,
    recibo: null,
    productosVendidos: null,
    reporteVentas: null,
    reporteVentasUsuarios: null,
    reporteVentasCategoria: null,
    reporteGanancias: null,
    reporteVentasProducto: null
};

// REDUCER FUNCTION
const ventasReducer = (state = initialState, action) => {
    switch(action.type){
        case SELECCIONAR_VENTA:
            return {
                ...state,
                ventaSeleccionada: action.venta
            }
        case SELECCIONAR_VENTA_CANCELADA:
            return {
                ...state,
                ventaCanceladaSeleccionada: action.venta
            }
        case OBTENER_VENTAS:
            return {
                ...state,
                ventas: action.ventas
            }
        case OBTENER_LISTADO_VENTAS_HOY:
        return {
            ...state,
            ventas: action.ventas
        }
        case OBTENER_VENTAS_HOY:
            return {
                ...state,
                ventas: action.ventas
            }
        case OBTENER_VENTAS_ENCABEZADO_HOY:
            return {
                ...state,
                encabezadosHoy: action.ventas
            }
        case OBTENER_VENTAS_GANANCIAS:
            return {
                ...state,
                reporteGanancias: action.ventas
            }
        case OBTENER_VENTAS_USUARIOS:
            return {
                ...state,
                reporteVentasUsuarios: action.ventas
            }
        case OBTENER_REPORTE_VENTAS:
            return {
                ...state,
                reporteVentas: action.ventas
            }
        case OBTENER_REPORTE_VENTAS_CATEGORIA:
            return {
                ...state,
                reporteVentasCategoria: action.ventas
            }
        case OBTENER_VENTAS_CANCELADAS:
            return {
                ...state,
                ventasCanceladas: action.ventas
            }
        case AGREGAR_PRODUCTO_CARRITO:
            return {
                ...state,
                productosSeleccionados: state.productosSeleccionados === null ? [action.producto] : [action.producto, ...state.productosSeleccionados],
                total: state.total + action.total
            }
        case AGREGAR_PRODUCTOS_CARRITO:
            return {
                ...state,
                productosSeleccionados: action.productos,
                total: action.total
            }
        case AGREGAR_PRODUCTO_CANTIDAD:
            return {
                ...state,
                carrito: action.carrito,
            }
        case CAMBIO_TOTAL_VENTA:
            return {
                ...state,
                total: action.total
            }
        case RESTAR_PRODUCTO_CANTIDAD:
            return {
                ...state,
                carrito: action.carrito,
                total: action.total
            }
        case ELIMINAR_PRODUCTO_CARRITO:
            return {
                ...state,
                productosSeleccionados: null,
                total: 0,
                informacionVenta: null
            }
        case ELIMINAR_REPORTE_VENTAS:
            return {
                ...state,
                reporteVentas: null
            }
        case VENTA_REALIZADA:
            return {
                ...state,
                productosSeleccionados: null,
                total: 0,
                tipoVenta: null,
                informacionVenta: null,
                recibo: action.recibo,
                productosVendidos: action.productosVendidos
            }
        case REPORTE_VENTA_PRODUCTOS:
            return {
                ...state,
                reporteVentasProducto: action.ventas
            }
        case "ELIMINAR_RECIBO":
            return {
                ...state,
                recibo: null
            }
        case CLEAR_VENTAS:
            return initialState;
        case CLEAR_LISTADOS_VENTAS:
            return {
                ...state,
                ventaSeleccionada: null,
                ventaCanceladaSeleccionada: null,
                ventas: null,
                ventasHoy: null,
                encabezadosHoy: null,
                ventasCanceladas: null,
                total: 0,
                recibo: null,
                reporteVentas: null,
                reporteVentasUsuarios: null,
                reporteVentasCategoria: null,
                reporteGanancias: null,
                reporteVentasProducto: null
            }
        default:
            return state;
    }
}

export default ventasReducer;