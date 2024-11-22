import React from 'react';
// import { useDispatch } from 'react-redux';

const ReporteCategorias = ({data, setShowForm}) => {
    // HOOKS
    // const dispatch = useDispatch();
    // STATE
    // const [totalVendido, setTotalVendido] = useState(0);

    // useEffect(() => {
    //     if(data){
    //         let total = 0;
    //         data.forEach((producto) => {
    //             total += parseFloat(producto.total);
    //         });
    //         setTotalVendido(total);
    //     }
    // }, [data])


    return (
        <>
        <table className="table table-hover table-secondary">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total Dinero</th>
                </tr>
            </thead>
            <tbody>
            {
                data.map((venta, index) => (
                    <tr
                        key={index}
                    >
                    <th scope="row">{index+1}</th>
                    <td>{venta.name}</td>
                    <td>{venta.cantidad}</td>
                    <td>Q.{venta.total}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        {/* <div>
            <h5>Total Vendido {new Date().toLocaleDateString()}: Q.{totalVendido}</h5>
        </div> */}
        </>
    )
}

export default ReporteCategorias;