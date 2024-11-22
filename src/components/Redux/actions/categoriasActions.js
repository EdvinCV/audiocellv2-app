// Actions types
import {
  OBTENER_PRODUCTOS_ERROR, OBTENER_CATEGORIAS
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientToken} from '../../../config/axios';

// Login Usuario
export const obtenerCategorias = () => {
    return async (dispatch) => {
        try {
            const categorias = await clientToken.get('api/categoria');
            dispatch({
                type: OBTENER_CATEGORIAS,
                categorias: categorias.data.categorias
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}