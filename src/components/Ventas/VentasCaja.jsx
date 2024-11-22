import React from 'react';
import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';

const VentasCaja = ({data, setShowForm}) => {
    // HOOKS
    // const dispatch = useDispatch();
    // STATE
    const [totalVendido, setTotalVendido] = useState(0);

    useEffect(() => {
        if(data){
            let total = 0;
            data.forEach((producto) => {
                total += parseFloat(producto.total);
            });
            setTotalVendido(total);
        }
    }, [data])


    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha de Venta</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => (
                    <tr
                        key={venta.id}
                    >
                    <th scope="row">{index+1}</th>
                    <td>{venta.Producto.name} - {venta.Producto.color}</td>
                    <td>Q.{venta.total}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{new Date(venta.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        <div>
            <h5>Total Vendido {new Date().toLocaleDateString()}: Q.{totalVendido}</h5>
        </div>
        </>
    )
}

export default VentasCaja;