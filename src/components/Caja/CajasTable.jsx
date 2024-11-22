import React from 'react';

const CajasTable = ({data}) => {
    return (
    <table className="table table-hover table-secondary">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Apertura</th>
                <th scope="col">Efectivo</th>
                <th scope="col">Tarjeta</th>
                <th style={{color: "blue"}} scope="col">Cierre</th>
                <th scope="col">Fecha</th>
            </tr>
        </thead>
        <tbody>
        {
            data.map((caja, index) => (
                <tr
                    key={caja.id}
                >
                <th scope="row">{index+1}</th>
                <td>Q.{caja.cantidadEfectivoApertura}</td>
                <td>Q.{caja.cantidadEfectivoDia}</td>
                <td>Q.{caja.cantidadTarjeta}</td>
                <td style={{color: "blue"}}>Q.{caja.cantidadEfectivoCierre}</td>
                <td>{new Date(caja.createdAt).toLocaleDateString()}</td>
                </tr>
            ))
        }
        </tbody>
    </table>
    )
}

export default CajasTable;