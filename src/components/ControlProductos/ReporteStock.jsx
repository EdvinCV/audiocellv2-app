import React, { useEffect, useState } from 'react';

const ReporteStock = ({data, admin}) => {
    // TOTAL GANANCIAS
    const [totalInvertido, setInvertido] = useState(0);

    useEffect(() => {
        let total = 0;
        if(data){
            data.forEach((p) => {
                total += (p.precioCompra * p.cantidadComprada);
            });
            setInvertido(total);
        }
    }, [data]);
    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    {
                        admin &&
                        <>
                            <th scope="col">Precio Compra</th>
                            <th scope="col">Invertido</th>
                            <th scope="col">Fecha Compra</th>
                        </>
                    }
                </tr>
            </thead>
            <tbody>
            {
                data.map((producto, index) => (
                    <tr
                        key={index}
                    >
                        <th scope="row">{index+1}</th>
                        <td>{producto.categoria}</td>
                        <td>{producto.name}-{producto.color}</td>
                        <td>{producto.cantidadComprada}</td>
                        {
                            admin && 
                            <>
                                <td>Q.{producto.precioCompra}</td>
                                <td>Q.{producto.precioCompra * producto.cantidadComprada}</td>
                                <td>{new Date(producto.createdAt).toLocaleDateString()}</td>
                            </>
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
        {
            admin &&
                <h5>Total Invertido: Q.{totalInvertido}</h5>
        }
        </>
    )
}

export default ReporteStock;