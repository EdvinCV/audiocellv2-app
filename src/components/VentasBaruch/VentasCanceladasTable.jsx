import React from 'react';
import { useDispatch } from 'react-redux';
import {FaRegEye} from 'react-icons/fa';
import {seleccionarVentaCancelada} from '../Redux/actions/ventasActions';

const VentasCanceladasTable = ({data, setShowDetail}) => {
    // HOOKS
    const dispatch = useDispatch();
    // STATE

    const handleSelectVenta = (venta) => {
        setShowDetail(true);
        dispatch(seleccionarVentaCancelada(venta));
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
                    <th scope="col">Razón</th>
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
                    <td>{venta.razonCancelacion}</td>
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
                    </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}

export default VentasCanceladasTable;