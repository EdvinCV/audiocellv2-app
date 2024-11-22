import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaRegEye} from 'react-icons/fa';
import {GiCancel} from 'react-icons/gi';
import {cancelarVentaCaja, seleccionarVenta} from '../Redux/actions/ventasActions';
import Swal from 'sweetalert2';

const VentasDetalleTable = ({data, setShowForm}) => {
    // HOOKS
    const dispatch = useDispatch();

    const handleSelectVenta = (venta) => {
        setShowForm(true);
        dispatch(seleccionarVenta(venta.id));
    }

    const handleCancelVenta = (venta) => {
        Swal.fire({
            title: 'Desea cancelar la venta?',
            showCancelButton: true,
            confirmButtonText: `Cancelar Venta`,
            cancelButtonText: `Cerrar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { value: text } = await Swal.fire({
                    input: 'textarea',
                    inputLabel: 'RAZÓN DE CANCELACIÓN',
                    inputPlaceholder: 'Escriba la razón...',
                    inputAttributes: {
                    'aria-label': 'Type your message here',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                })
                if (text) {
                    dispatch(cancelarVentaCaja({venta, razon: text}));
                }
            }
        });
    }

    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio Venta</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">ICC</th>
                    <th scope="col">Número</th>
                    <th scope="col">Fecha</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => (
                    <tr
                        key={venta.id}
                    >
                    <th scope="row">{index+1}</th>
                    <td>{venta.Producto ? venta.Producto.name + " " + venta.Producto.Categorium.name : " " }</td>
                    <td>{venta.precioFinal ? venta.precioFinal : ""}</td>
                    <td>{venta.imei ? venta.imei : ""}</td>
                    <td>{venta.icc ? venta.icc : ""}</td>
                    <td>{venta.numero ? venta.numero : ""}</td>
                    <td>{new Date(venta.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}

export default VentasDetalleTable;