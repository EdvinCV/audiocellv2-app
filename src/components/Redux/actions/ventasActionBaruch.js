// Actions types
import {
    OBTENER_TOTAL_VENTAS_BARUCH, OBTENER_VENTAS_ERROR_BARUCH, OBTENER_VENTAS_BARUCH,OBTENER_LISTADO_VENTAS_HOY_BARUCH,OBTENER_VENTAS_USUARIOS_BARUCH,
    OBTENER_VENTAS_HOY_BARUCH,OBTENER_VENTAS_CANCELADAS_BARUCH,SELECCIONAR_VENTA_BARUCH,SELECCIONAR_VENTA_CANCELADA_BARUCH,
    VENTA_REALIZADA_BARUCH,OBTENER_VENTAS_ENCABEZADO_HOY_BARUCH,AGREGAR_PRODUCTO_CARRITO_BARUCH,AGREGAR_PRODUCTOS_CARRITO_BARUCH,REPORTE_VENTA_PRODUCTOS_BARUCH,
    ELIMINAR_REPORTE_VENTAS_BARUCH, OBTENER_REPORTE_VENTAS_CATEGORIA_BARUCH, OBTENER_VENTAS_GANANCIAS_BARUCH,OBTENER_REPORTE_VENTAS_BARUCH,CAMBIO_TOTAL_VENTA_BARUCH,
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientTwoToken as clientToken} from '../../../config/axios';
import Swal from 'sweetalert2';

/* OBTENER EL TOTAL DE VENTAS REALIZADAS */
export const obtenerTotalVentas = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/total');
            dispatch({
                type: OBTENER_TOTAL_VENTAS_BARUCH,
                totalVentas: data.total
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

/* OBTENER TODAS LAS VENTAS GENERADAS EN EL SISTEMA */
export const obtenerVentas = (formFechas) => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta', {params: {inicio: formFechas.fechaInicio, fin: formFechas.fechaFin}});
            dispatch({
                type: OBTENER_VENTAS_BARUCH,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

export const obtenerListadoVentasHoy = () => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/hoy');
            dispatch({
                type: OBTENER_LISTADO_VENTAS_HOY_BARUCH,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

/* OBTENER REPORTE DE VENTAS DE USUARIOS */
export const obtenerVentasUsuarios = (formFechas) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/usuarios', {params: {inicio: formFechas.fechaInicio, fin: formFechas.fechaFin}});
            dispatch({
                type: OBTENER_VENTAS_USUARIOS_BARUCH,
                ventas:data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

/* OBTENER TODAS LAS VENTAS HOY */
export const obtenerVentasHoy = () => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/hoy');
            dispatch({
                type: OBTENER_VENTAS_HOY_BARUCH,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

/* OBTENER TODAS LAS VENTAS CANCELADAS EN EL SISTEMA */
export const obtenerVentasCanceladas = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/canceladas', {params: {fechaInicio, fechaFin}});
            dispatch({
                type: OBTENER_VENTAS_CANCELADAS_BARUCH,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

export const seleccionarVenta = (venta) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/recibo', {params: {id:venta}});
            console.log(data);
            dispatch({
                type: SELECCIONAR_VENTA_BARUCH,
                venta: data
            });
        } catch(error) {
            console.log(error);
        }
    }
}

export const seleccionarVentaCancelada = (venta) => {
    return async (dispatch) => {
        try {
            console.log(venta);
            const {data} = await clientToken.get('api/venta/cancelada', {params: {id:venta.id}});
            dispatch({
                type: SELECCIONAR_VENTA_CANCELADA_BARUCH,
                venta: data
            });
        } catch(error) {
            console.log(error);
        }
    }
}

/* GENERAR UNA NUEVA VENTA */
export const generarVenta = (formValues) => {
    return async (dispatch, getState) => {
        try {
            const state = await getState();
            const venta = {
                venta: formValues,
                total: parseInt(state.ventasBaruch.totalBaruch),
                usuario: state.usuarios.me
            }
            const productos = state.ventasBaruch.productosSeleccionadosBaruch;
            const {data} = await clientToken.post('api/venta', {venta, productos});
            await dispatch({
                type: VENTA_REALIZADA_BARUCH,
                recibo: data.recibo,
                productosVendidos: data.productosVendidos
            });
            await dispatch({
                type: "ELIMINAR_RECIBO_BARUCH"
            })
            Swal.fire(
                'Venta realizada correctamente.',
                'Audiocell.',
                'success'
            );
            Swal.fire({
                title: 'Venta realizada correctamente',
                confirmButtonText: 'Continuar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
        }catch(error){
            console.log(error);
            Swal.fire(
                'Ha ocurrido un error.',
                'Audiocell.',
                'error'
            );
        }
    }
}

export const cancelarVenta = (venta) => {
    return async (dispatch) => {
        try {
            
            await clientToken.post('api/venta/delete', {venta});
            const ventas = await clientToken.get('api/venta');
            const ventasHoy = await clientToken.get('api/venta');
            dispatch({
                type: OBTENER_VENTAS_BARUCH,
                ventas: ventas.data.ventas
            });
            dispatch({
                type: OBTENER_VENTAS_HOY_BARUCH,
                ventas: ventasHoy.data.ventas
            });
            Swal.fire(
                'Venta cancelada correctamente.',
                'Audiocell.',
                'success'
            );
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

export const cancelarVentaCaja = (venta) => {
    return async (dispatch) => {
        try {
            await clientToken.post('api/venta/delete', venta);
            const ventas = await clientToken.get('api/venta');
            const ventasHoy = await clientToken.get('api/venta/hoy');
            const ventasCanceladas = await clientToken.get('api/venta/hoyEncabezado');
            dispatch({
                type: OBTENER_VENTAS_ENCABEZADO_HOY_BARUCH,
                ventas: ventasCanceladas.data.ventas
            });
            dispatch({
                type: OBTENER_VENTAS_BARUCH,
                ventas: ventas.data.ventas
            });
            dispatch({
                type: OBTENER_VENTAS_HOY_BARUCH,
                ventas: ventasHoy.data.ventas
            });
            Swal.fire(
                'Venta cancelada correctamente.',
                'Audiocell.',
                'success'
            );
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

/* AGREGAR PRODUCTO PARA VENDER */
export const agregarProductoCarrito = (producto) => {
    return async (dispatch, getState) => {
        try {
            // Generar la estructura del objeto producto.
            const state = getState();
            const productosCarrito = state.ventasBaruch.productosSeleccionadosBaruch;
            let productoExistente = false;
            producto = {
                ...producto,
                stock: parseInt(producto.stock),
                idProducto: producto.id,
                precioFinal: parseInt(producto.precioVenta),
                cantidad: 1
            }
            if(productosCarrito){
                for(let p of productosCarrito){
                    if(p.id===producto.id){
                        productoExistente=true;
                        break;
                    }
                }
            }
            if(productoExistente===true){
                Swal.fire(
                    'Producto ya existente.',
                    'Audiocell.',
                    'error'
                );   
            } else {
                const total = producto.precioFinal;
                dispatch({
                    type: AGREGAR_PRODUCTO_CARRITO_BARUCH,
                    producto: producto,
                    total
                });
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const cambiarCantidadPrecio = (producto) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const listadoProductosSeleccionados = state.ventasBaruch.productosSeleccionadosBaruch;
            if(parseInt(producto.cantidad) > 0)
            {
                var total = 0;
                listadoProductosSeleccionados.map((prod) => {
                    if(prod.id===producto.id){
                        prod.cantidad = producto.cantidad;
                    }
                    prod.precioFinal = parseInt(prod.cantidad)*parseInt(prod.precioVenta);
                    total += prod.precioFinal;
                    return prod;
                });
            } else {
                Swal.fire(
                    'Debe ingresar una cantidad correcta.',
                    'Audiocell.',
                    'error'
                );
                total = 0;
            }
            dispatch({
                type: AGREGAR_PRODUCTOS_CARRITO_BARUCH,
                productos: listadoProductosSeleccionados,
                total
            })
        } catch(error){
            console.log(error);
        }
    }
}

export const cambiarCantidadEpin = (cantidad) => {
    return async (dispatch) => {
        dispatch({
            type: CAMBIO_TOTAL_VENTA_BARUCH,
            total: cantidad
        });
    }
}

export const eliminarProductoCarrito = (id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const prods = state.ventasBaruch.productosSeleccionadosBaruch;
            var total = 0;
            const nuevosProductosSeleccionados = prods.length > 1 ? [] : null;
            prods.forEach((p) => {
                if(p.id !== id){
                    total = total + p.precioFinal;
                    nuevosProductosSeleccionados.push(p);
                }
            });
            dispatch({
                type: AGREGAR_PRODUCTOS_CARRITO_BARUCH,
                productos: nuevosProductosSeleccionados,
                total
            });
        } catch(error) {
            console.log(error);
        }
    }
}

// GET REPORTE VENTAS
export const getReporteVentas = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/reporte', {params: {fechaInicio,fechaFin}});
            console.log(data);
            dispatch({
                type: OBTENER_REPORTE_VENTAS_BARUCH,
                ventas: data
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}
// GET REPORTE GANANCIAS
export const getReporteVentasGanancias = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/ganancias', {params: {fechaInicio,fechaFin}});
            dispatch({
                type: OBTENER_VENTAS_GANANCIAS_BARUCH,
                ventas: data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

// GET REPORTE VENTAS DEL DIA POR CATEGORÍA
export const getReporteVentasCategoriaHoy = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/categoria');
            console.log(data);
            dispatch({
                type: OBTENER_REPORTE_VENTAS_CATEGORIA_BARUCH,
                ventas: data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

export const deleteReporteVentas = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ELIMINAR_REPORTE_VENTAS_BARUCH
            })
        } catch(error){

        }
    }
}

/* OBTENER TODAS LAS VENTAS HOY */
export const getReporteEncabezadosHoy = () => {
    return async (dispatch) => {
        try {
            const ventas = await clientToken.get('api/venta/hoyEncabezado');
            dispatch({
                type: OBTENER_VENTAS_ENCABEZADO_HOY_BARUCH,
                ventas: ventas.data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

export const getReporteEncabezados = ({fechaInicio, fechaFin}) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/reporteEncabezados', {params: {fechaInicio,fechaFin}});
            console.log(data);
            dispatch({
                type: OBTENER_VENTAS_ENCABEZADO_HOY_BARUCH,
                ventas: data.ventas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_VENTAS_ERROR_BARUCH
            });
        }
    }
}

export const getReporteVentasProducto = (producto) => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/venta/ventasProducto', {params: {id:producto.value}});
            console.log("THEEES", data.productosVendidos);
            dispatch({
                type: REPORTE_VENTA_PRODUCTOS_BARUCH,
                ventas: data.productosVendidos
            });
        } catch(error) {
            console.log(error);
        }
    }
}