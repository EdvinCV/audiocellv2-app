// Actions types
import {
    OBTENER_USUARIOS, CREAR_USUARIO, SELECCIONAR_USUARIO, GET_ME, ELIMINAR_USUARIO, OBTENER_TIENDAS, SELECT_TIENDA
} from '../actionTypes';
// ACTIONS DE AUTENTICACION
import {clientToken, clientTwoToken} from '../../../config/axios';
import Swal from 'sweetalert2';

// Obtener información de usuario logueado.
export const obtenerUsuario = () => {
    return async (dispatch) => {
        try {
            const id = localStorage.getItem("id");
            const {data} = await clientToken.post('api/users/me', {id});
            try {
                if(data.usuario.rol !== "ADMIN"){
                    localStorage.setItem("s", data.usuario.TiendaId);
                }
            } catch(error){}
            dispatch({
                type: GET_ME,
                me: data.usuario
            });
        } catch(error) {
            console.log(error);
        }
    }
}

// Obtener listado de usuarios
export const obtenerUsuarios = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/users');
            dispatch({
                type: OBTENER_USUARIOS,
                usuarios: data.users
            });
        } catch(error) {
            console.log(error);
        }
    }
}

// Crear nuevo usuario
export const crearUsuario = (usuario) => {
    return async (dispatch) => {
        try {
            await clientToken.post('api/users', usuario);
            const {data} = await clientToken.get('api/users');  
            Swal.fire(
                'Usuario creado correctamente.',
                'Audiocell.',
                'success'
            );

            dispatch({
                type: CREAR_USUARIO,
                usuarios: data.users
            });
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

// Editar usuario
export const editarUsuario = (usuario) => {
    return async (dispatch) => {
        try {
            console.log(usuario);
            await clientToken.put('api/users', usuario);
            const {data} = await clientToken.get('api/users');  
            Swal.fire(
                'Usuario editado correctamente.',
                'Audiocell.',
                'success'
            );

            dispatch({
                type: CREAR_USUARIO,
                usuarios: data.users
            });
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

// Seleccionar usuario para editar
export const seleccionarUsuario = (usuario) => {
    return async (dispatch) => {
        try {
            usuario.password = null;
            dispatch({
                type: SELECCIONAR_USUARIO,
                usuario
            });
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

// Eliminar usuario
export const deleteUsuario = (id) => {
    return async (dispatch) => {
        try {
            const resp = await clientToken.put('api/users/delete', {id});
            if(resp.data.data === 1){
                const {data} = await clientToken.get('api/users');
                dispatch({
                    type: ELIMINAR_USUARIO,
                    usuarios: data.users
                });
                Swal.fire(
                    'Usuario eliminado correctamente.',
                    'Audiocell.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Usuario no existente.',
                    'Audiocell.',
                    'error'
                );
            }
        } catch(error){
            console.log(error);
        }
    }
}

// Obtener listado de tiendas
export const obtenerTiendas = () => {
    return async (dispatch) => {
        try {
            const {data} = await clientToken.get('api/tienda');
            dispatch({
                type: OBTENER_TIENDAS,
                tiendas: data.tiendas
            });
        } catch(error) {
            console.log(error);
        }
    }
}

// Seleccionar tienda
export const selectTienda = (tiendaId=0) => {
    return async (dispatch) => {
        if(tiendaId === 0){
            tiendaId = localStorage.getItem("s");
        } else {
            localStorage.setItem("s", tiendaId);
        }
        try {
            dispatch({
                type: SELECT_TIENDA,
                tienda: tiendaId
            });
        }
        catch(error){
            console.log(error);
        }
    }
}