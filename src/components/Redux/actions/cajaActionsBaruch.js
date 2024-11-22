// Actions types
import {OBTENER_CAJAS_GENERAL_BARUCH,OBTENER_CAJAS_GENERAL_ERROR_BARUCH,OBTENER_CAJA_BARUCH,OBTENER_CAJA_ERROR_BARUCH,ABRIR_CAJA_BARUCH} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientTwoToken as clientToken} from '../../../config/axios';
import Swal from 'sweetalert2';

export const obtenerCajas = () => {
    return async (dispatch) => {
        try {
            const cajasObtenidas = await clientToken.get('api/caja/general');
            dispatch({
                type: OBTENER_CAJAS_GENERAL_BARUCH,
                cajas: cajasObtenidas.data.cajas
            });
        } catch(error) {
            dispatch({
                type: OBTENER_CAJAS_GENERAL_ERROR_BARUCH
            });
        }
    }
}

export const obtenerCaja = () => {
    return async (dispatch) => {
        try {
            const cajaActual = await clientToken.get('api/caja');
            if(cajaActual.data.ok === false){
                dispatch({
                    type: OBTENER_CAJA_BARUCH,
                    cajaActual: {status: "CERRADO", cantidadEfectivoCierre: 0},
                    cajaAbierta: false
                });
            } else {
                if(cajaActual.data.cajaActual.status === "CERRADO"){
                    dispatch({
                        type: OBTENER_CAJA_BARUCH,
                        cajaActual: cajaActual.data.cajaActual,
                        cajaAbierta: false
                    });
                } else if(cajaActual.data.cajaActual.status === "ABIERTO"){
                    dispatch({
                        type: OBTENER_CAJA_BARUCH,
                        cajaActual: cajaActual.data.cajaActual,
                        cajaAbierta: true
                    });
                }
            }
        } catch(error) {
            dispatch({
                type: OBTENER_CAJA_ERROR_BARUCH
            });
        }
    }
}

export const abrirCaja = (apertura) => {
    return async (dispatch) => {
        try {
            const caja = {
                apertura
            }
            await clientToken.post('api/caja', caja);
            const cajaActual = await clientToken.get('api/caja');

            Swal.fire(
                'Caja abierta correctamente.',
                'Audiocell.',
                'success'
            );
            dispatch({
                type: ABRIR_CAJA_BARUCH,
                cajaActual: cajaActual.data.cajaActual,
                cajaAbierta: true
            });
        } catch(error){
            console.log(error);
        }
    }
}

export const cerrarCaja = () => {
    return async (dispatch) => {
        try {
            await clientToken.post('api/caja/cerrar');
            Swal.fire(
                'Caja cerrada correctamente.',
                'Audiocell.',
                'success'
            );
            const cajaActual = await clientToken.get('api/caja');
            if(cajaActual.data.ok === false){
                dispatch({
                    type: OBTENER_CAJA_BARUCH,
                    cajaActual: {status: "CERRADO", cantidadEfectivoCierre: 0}
                });
            } else {
                dispatch({
                    type: OBTENER_CAJA_BARUCH,
                    cajaActual: cajaActual.data.cajaActual
                });
            }
        } catch(error){
            console.log(error);
        }
    }
}