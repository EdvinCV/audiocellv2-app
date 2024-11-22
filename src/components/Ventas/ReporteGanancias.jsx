import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ReporteGanancias = ({data}) => {
    // TOTAL GANANCIAS
    const [totalGanancias, setGanancias] = useState(0);

    useEffect(() => {
        let total = 0;
        if(data){
            data.forEach((v) => {
                total += parseInt(v.Ganancia);
            });
            setGanancias(total);
        }
    }, [data]);

    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Color</th>
                    <th scope="col">Vendidos</th>
                    <th scope="col">Ganancia</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => {
                    return (
                        <tr
                            key={venta.id}
                        >
                            <th scope="row">{index+1}</th>
                            <td>{venta.Categoria}</td>
                            <td>{venta.Producto}</td>
                            <td>{venta.color}</td>
                            <td>{venta.Vendidos}</td>
                            <td>Q.{venta.Ganancia}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        <h5>Total Ganancias: Q.{totalGanancias}</h5>
        </>
    )
}

export default ReporteGanancias;