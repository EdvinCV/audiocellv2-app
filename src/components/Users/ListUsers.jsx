import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import UsuariosTable from './UsuariosTable';
import { obtenerUsuarios, crearUsuario, seleccionarUsuario, editarUsuario, deleteUsuario, obtenerUsuario, obtenerTiendas } from '../Redux/actions/usersActions';
import Loader from "react-loader-spinner";
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import UserForm from './UserForm';
import UserEditForm from './UserEditForm';
import Swal from 'sweetalert2';
import { clientToken } from '../../config/axios';
import { Redirect } from 'react-router-dom';

const ListUsers = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const usuarioVerificacion = useSelector((state) => state.usuarios);

    // Obtener ventas
    useEffect(() => {
        dispatch(obtenerUsuarios());
        dispatch(obtenerUsuario());
        dispatch(obtenerTiendas());
    }, [dispatch])

    // Handle submit form
    const handleSubmit = (values) => {
        setShow(false);
        dispatch(crearUsuario(values))
    }

    const handleSelectUser = (usuario) => {
        Swal.fire({
            title: 'Introduzca contraseña',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                const user = {
                    password,
                    username: usuarioVerificacion.me.username
                }
                return clientToken.post(`api/producto/verificar`, user)
                    .then(response => {
                        if(response.data.ok){
                            return response.data.msg
                        }
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Contraseña incorrecta, vuelva a intentar`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(seleccionarUsuario(usuario));
                    setShowEditForm(true);
                }
            });
    }

    const handleSubmitEdit = (values) => {
        dispatch(editarUsuario(values));
        setShowEditForm(false);
    }

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: 'Desea eliminar el usuario?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Introduzca contraseña',
                    input: 'password',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: 'Confirmar',
                    showLoaderOnConfirm: true,
                    preConfirm: (password) => {
                        const user = {
                            password,
                            username: usuarioVerificacion.me.username
                            
                        }
                        return clientToken.post(`api/producto/verificar`, user)
                            .then(response => {
                                if(response.data.ok){
                                    return response.data.msg
                                }
                            })
                            .catch(error => {
                                Swal.showValidationMessage(
                                    `Contraseña incorrecta, vuelva a intentar`
                                )
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(deleteUsuario(id));
                        }
                    });
            }
        });
    }

    const usuarios = useSelector((state) => state.usuarios.usuarios);
    const tiendas = useSelector((state) => state.usuarios.tiendas);
    
    if(usuarioVerificacion){
        if(usuarioVerificacion.me){
            console.log("USUARIO VER",usuarioVerificacion.me.rol);
            if(usuarioVerificacion.me.rol !== "ADMIN"){
                return (
                    <Redirect to="/home" />
                )
            }
        }
    }
    return (
        <div className="contenedor-usuarios">
            <div
                style={{display: "flex", flexWrap: "wrap"}}
            >
                <h1>Control de usuarios</h1>
                <button
                    className="btn btn-primary ml-5"
                    onClick={()=> setShow(true)}
                >
                    Agregar Usuario
                </button>
            </div>
            <hr/>
            <div
                style={{overflowY: "scroll", "textAlign": "center"}}
            >
                {
                    usuarios ? (
                        usuarios.length > 0 ? (
                            <UsuariosTable
                                data={usuarios}
                                handleSelectUser={handleSelectUser}
                                handleDeleteUser={handleDeleteUser}
                            />
                        ) : (
                            <h3>No existe ningún registro.</h3>
                        )
                    ) : (
                        <Loader 
                            type="ThreeDots"
                            color="#121D3B"
                            height={100}
                            width={100}
                        />
                    )
                }
            </div>
            {/* FORMULARIO PARA CREAR NUEVO USUARIO */}
            <Modal
                show={show}
                onHide={() => {setShow(false)}}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear nuevo usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm 
                        onSubmit={handleSubmit}
                        tiendas={tiendas}
                    />
                </Modal.Body>
            </Modal>
            {/* FORMULARIO DE EDICION DE USUARIO  */}
            <Modal
                show={showEditForm}
                onHide={() => {setShowEditForm(false)}}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserEditForm 
                        onSubmit={handleSubmitEdit}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )

}
export default ListUsers;