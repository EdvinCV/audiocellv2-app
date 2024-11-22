import React from 'react';

const ReporteUsuarios = ({data}) => {
    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => (
                    <tr
                        key={venta.name}
                    >
                        <th scope="row">{index+1}</th>
                        <td>{venta.name}</td>
                        <td>{venta.total}</td>
                        <td>Q.{venta.cantidad}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}

export default ReporteUsuarios;