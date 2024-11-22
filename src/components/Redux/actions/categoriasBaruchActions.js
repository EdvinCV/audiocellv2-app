// Actions types
import {
  OBTENER_PRODUCTOS_ERROR, OBTENER_CATEGORIAS_BARUCH
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientTwoToken} from '../../../config/axios';

// Login Usuario
export const obtenerCategorias = () => {
    return async (dispatch) => {
        try {
            const categorias = await clientTwoToken.get('api/categoria');
            dispatch({
                type: OBTENER_CATEGORIAS_BARUCH,
                categorias: categorias.data.categorias
            });
        } catch(error) {
            dispatch({
                type: OBTENER_PRODUCTOS_ERROR
            });
        }
    }
}