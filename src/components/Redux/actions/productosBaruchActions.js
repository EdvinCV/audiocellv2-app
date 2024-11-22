// Actions types
import {
    OBTENER_TOTAL_PRODUCTOS_BARUCH,OBTENER_PRODUCTOS_ERROR_BARUCH,OBTENER_PRODUCTOS_BARUCH,OBTENER_LISTADO_STOCK_BARUCH,CREAR_PRODUCTO_BARUCH,EDITAR_PRODUCTO_BARUCH,SELECTED_PRODUCT_BARUCH,OBTENER_REPORTE_PRODUCTOS_BARUCH,OBTENER_TOTAL_INVERTIDO_BARUCH,OBTENER_REPORTE_STOCK_BARUCH,ELIMINAR_STOCK_BARUCH, OBTENER_PRODUCTOS_BARUCH_VENTA
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientTwoToken} from '../../../config/axios';
import Swal from 'sweetalert2';

// Obtener total de productos registrados
export const obtenerTotalProductos = (buscador='') => {
    return async (dispatch) => {
        try {
            const {data} = await clientTwoToken.get('api/producto/total', {params: {buscador}});
            dispatch({
                type: OBTENER_TOTAL_PRODUCTOS_BARUCH,
                totalProductos: data.total
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR_BARUCH
            });
        }
    }
}

export const obtenerProductos = (page=1,buscador='') => {
    return async (dispatch) => {
        try {
            const productos = await clientTwoToken.get('api/producto', {params: {page, buscador}});
            dispatch({
                type: OBTENER_PRODUCTOS_BARUCH,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR_BARUCH
            });
        }
    }
}

export const obtenerProductosVenta = (page=1,buscador='') => {
    return async (dispatch) => {
        try {
            const {data} = await clientTwoToken.get('api/venta/productos');
            dispatch({
                type: OBTENER_PRODUCTOS_BARUCH_VENTA,
                productosVenta: data.results
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR_BARUCH
            });
        }
    }
}

export const obtenerListadoStock = (producto) => {
    return async (dispatch) => {
        try {
            const {data} = await clientTwoToken.get('api/producto/stock', {params: {id: producto}});
            dispatch({
                type: OBTENER_LISTADO_STOCK_BARUCH,
                listado: data.listado
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR_BARUCH
            });
        }
    }
}

export const crearProducto = (producto, buscador='') => {
    return async (dispatch) => {
        try {
            producto = {
                ...producto,
                precioCompra: parseInt(producto.precioCompra),
                precioVenta: parseInt(producto.precioVenta),
                stock: parseInt(producto.stock)
            }

            await clientTwoToken.post('api/producto', producto);
            const productos = await clientTwoToken.get('api/producto', {params: {page: 1, buscador}});
            Swal.fire(
                'Producto creado correctamente.',
                'Audiocell.',
                'success'
            );
            dispatch({
                type: CREAR_PRODUCTO_BARUCH,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const crearProductoStock = (producto) => {
    return async (dispatch) => {
        try {
            await clientTwoToken.post('api/producto/stock', producto);
            const productos = await clientTwoToken.get('api/producto', {params: {page: 1,buscador:''}});
            Swal.fire(
                'Stock agregado correctamente.',
                'Audiocell.',
                'success'
            );
            dispatch({
                type: CREAR_PRODUCTO_BARUCH,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
            
            // Total invertido
            const {dataTotal} = await clientTwoToken.get('api/venta/invertido');
            const totalInvertido = dataTotal.results[0].Invertido;
            dispatch({
                type: OBTENER_TOTAL_INVERTIDO_BARUCH,
                totalInvertido: parseFloat(totalInvertido)
            });

        } catch(error){
            console.log(error);
        }
    }
}

export const editarProducto = (producto) => {
    return async (dispatch) => {
        try {
            producto = {
                ...producto,
                categoria: parseInt(producto.categoria),
                precioVenta: parseInt(producto.precioVenta),
                precioCompra: parseInt(producto.precioCompra),
                stock: parseInt(producto.stock)
            }
            const resp = await clientTwoToken.put('api/producto', producto);
            if(resp.data.data === 1){
                const productos = await clientTwoToken.get('api/producto', {params: {page: 1, buscador: ''}});
                dispatch({
                    type: EDITAR_PRODUCTO_BARUCH,
                    productos: productos.data.productos,
                    productosNoDisponibles: productos.data.productosNoDisponibles
                });
                Swal.fire(
                    'Producto editado correctamente.',
                    'Audiocell.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Producto no existente.',
                    'Audiocell.',
                    'error'
                );
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const deleteProducto = (id) => {
    return async (dispatch) => {
        try {
            const resp = await clientTwoToken.put('api/producto/delete', {id: id});
            if(resp.data.data === 1){
                const productos = await clientTwoToken.get('api/producto', {params: {page: 1, buscador: ''}});
                dispatch({
                    type: EDITAR_PRODUCTO_BARUCH,
                    productos: productos.data.productos,
                    productosNoDisponibles: productos.data.productosNoDisponibles
                });
                Swal.fire(
                    'Producto eliminado correctamente.',
                    'Audiocell.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Producto no existente.',
                    'Audiocell.',
                    'error'
                );
            }
        } catch(error){
            console.log(error);
        }
    }
}

export const seleccionarProducto = (producto) => {
    return async(dispatch) => {
        try {
            dispatch({
                type: SELECTED_PRODUCT_BARUCH,
                producto
            });
        } catch(error){
            console.log(error);
        }
    }
}

/* REPORTES */
export const getReporteProductos = () => {
    return async(dispatch) => {
        try {
            const productos = await clientTwoToken.get('api/producto/reporte');
            dispatch({
                type: OBTENER_REPORTE_PRODUCTOS_BARUCH,
                productos: productos.data.productos
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const getReporteProductosStock = (formFechas) => {
    return async(dispatch) => {
        try {
            const {data} = await clientTwoToken.get('api/producto/reporteStock', {params: {inicio: formFechas.fechaInicio, fin: formFechas.fechaFin}});
            dispatch({
                type: OBTENER_REPORTE_STOCK_BARUCH,
                productos: data.results
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const deleteStock = (id) => {
    return async (dispatch) => {
        try {
            await clientTwoToken.put('api/producto/stock', {id});
            const productos = await clientTwoToken.get('api/producto', {params: {page: 1, buscador: ''}});
            Swal.fire(
                'Stock eliminado correctamente.',
                'Audiocell.',
                'success'
            );
            dispatch({
                type: ELIMINAR_STOCK_BARUCH,
            });
            dispatch({
                type: CREAR_PRODUCTO_BARUCH,
                productos: productos.data.productos,
                productosNoDisponibles: productos.data.productosNoDisponibles
            });
        } catch(error){
            console.log(error);
        }
    }
}

// Obtener listado de usuarios
export const obtenerTotalInvertido = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientTwoToken.get('api/venta/invertido');
            const totalInvertido = data.results[0].Invertido;
            if(isNaN(totalInvertido)){
                Swal.fire(
                    'Error al obtener total invertido.',
                    'Audiocell.',
                    'error'
                );
            }else {
                dispatch({
                    type: OBTENER_TOTAL_INVERTIDO_BARUCH,
                    totalInvertido: parseFloat(totalInvertido)
                });
            }
        } catch(error) {
            console.log(error);
        }
    }
}
