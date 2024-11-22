import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaRegEye} from 'react-icons/fa';
import {cancelarVentaCaja, seleccionarVenta} from '../Redux/actions/ventasActions';
import Swal from 'sweetalert2';

const VentasEncabezosTable = ({data, setShowForm}) => {
    // HOOKS
    const dispatch = useDispatch();
    // STATE

    const usuarioVerificacion = useSelector((state) => state.usuarios);

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
                    await dispatch(cancelarVentaCaja({venta, razon: text}));
                    window.location.reload(false);
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
                    <th scope="col">Correlativo</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">NIT</th>
                    <th scope="col">Tipo Venta</th>
                    <th scope="col">Total</th>
                    <th scope="col">Fecha de Venta</th>
                    <th scope="col">Detalles</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => (
                    <tr
                        key={venta.id}
                    >
                    <th scope="row">{index+1}</th>
                    <td>{venta.correlativo}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{venta.nit}</td>
                    <td>{venta.tipoVenta}</td>
                    <td>Q.{venta.total}</td>
                    <td>{new Date(venta.createdAt).toLocaleDateString()}</td>
                    <td style={{display: "flex", justifyContent: "space-around"}}>
                        <div style={{marginLeft: "2px"}}>
                            <button className="btn btn-warning" onClick={() => {handleSelectVenta(venta)}}>
                                Ver
                                <FaRegEye
                                size="20px"
                                />
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-danger" onClick={() => {handleCancelVenta(venta)}}>
                                Cancelar
                            </button>
                        </div>
                    </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}

export default VentasEncabezosTable;