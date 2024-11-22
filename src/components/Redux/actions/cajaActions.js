// Actions types
import {
    ABRIR_CAJA, OBTENER_CAJA, OBTENER_CAJA_ERROR, OBTENER_CAJAS_GENERAL, OBTENER_CAJAS_GENERAL_ERROR
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientToken} from '../../../config/axios';
import Swal from 'sweetalert2';

export const obtenerCajas = () => {
    return async (dispatch, getState) => {
        try {
            const tienda = Number(getState().usuarios.selectedTienda) || 0;
            const cajasObtenidas = await clientToken.get('api/caja/general', {params: {tienda}});
            dispatch({
                type: OBTENER_CAJAS_GENERAL,
                cajas: cajasObtenidas.data.cajas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_CAJAS_GENERAL_ERROR
            });
        }
    }
}

export const obtenerCaja = () => {
    return async (dispatch, getState) => {
        try {
            const tienda = Number(getState().usuarios.selectedTienda) || 0;
            const cajaActual = await clientToken.get('api/caja', {params: {tienda}});
            if(cajaActual.data.ok === false){
                dispatch({
                    type: OBTENER_CAJA,
                    cajaActual: {status: "CERRADO", cantidadEfectivoCierre: 0},
                    cajaAbierta: false
                });
            } else {
                if(cajaActual.data.cajaActual.status === "CERRADO"){
                    dispatch({
                        type: OBTENER_CAJA,
                        cajaActual: cajaActual.data.cajaActual,
                        cajaAbierta: false
                    });
                } else if(cajaActual.data.cajaActual.status === "ABIERTO"){
                    dispatch({
                        type: OBTENER_CAJA,
                        cajaActual: cajaActual.data.cajaActual,
                        cajaAbierta: true
                    });
                }
            }
        } catch(error) {
            dispatch({
                type: OBTENER_CAJA_ERROR
            });
        }
    }
}

export const abrirCaja = (apertura) => {
    return async (dispatch, getState) => {
        try {
            const caja = {
                apertura
            }
            const tienda = Number(getState().usuarios.selectedTienda) || 0;
            await clientToken.post('api/caja', {...caja, tienda});
            const cajaActual = await clientToken.get('api/caja', {params: {tienda}});

            Swal.fire(
                'Caja abierta correctamente.',
                'Audiocell.',
                'success'
            );
            dispatch({
                type: ABRIR_CAJA,
                cajaActual: cajaActual.data.cajaActual,
                cajaAbierta: true
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const cerrarCaja = () => {
    return async (dispatch, getState) => {
        try {
            const tienda = Number(getState().usuarios.selectedTienda) || 0;
            await clientToken.post('api/caja/cerrar', {tienda});
            Swal.fire(
                'Caja cerrada correctamente.',
                'Audiocell.',
                'success'
            );
            const cajaActual = await clientToken.get('api/caja', {params:{tienda}});
            if(cajaActual.data.ok === false){
                dispatch({
                    type: OBTENER_CAJA,
                    cajaActual: {status: "CERRADO", cantidadEfectivoCierre: 0}
                });
            } else {
                dispatch({
                    type: OBTENER_CAJA,
                    cajaActual: cajaActual.data.cajaActual
                });
            }
        } catch(error){
            console.log(error);
        }
    }
}